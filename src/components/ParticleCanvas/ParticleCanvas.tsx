import { useRef, useEffect } from "react";
import { colors } from "../../utils/color";

type Particle = {
  x: number;
  y: number;
  directionx: number;
  directiony: number;
  size: number;
  color: string;
  repelled: boolean;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    exclusionZone: DOMRect | null,
    pointer: { x: number | null; y: number | null }
  ) => void;
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const pointer = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const getRandomColor = (): string =>
    colors[Math.floor(Math.random() * colors.length)];

  const createParticle = (
    x: number,
    y: number,
    directionx: number,
    directiony: number,
    size: number,
    color: string
  ): Particle => ({
    x,
    y,
    directionx,
    directiony,
    size,
    color,
    repelled: false,
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update(
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      exclusionZone: DOMRect | null,
      pointer: { x: number | null; y: number | null }
    ) {
      // Collision avec les bords
      if (this.x + this.size > canvasWidth || this.x - this.size < 0) {
        this.directionx = -this.directionx;
      }
      if (this.y + this.size > canvasHeight || this.y - this.size < 0) {
        this.directiony = -this.directiony;
      }

      // Collision avec la zone d'exclusion
      if (
        exclusionZone &&
        this.x + this.size > exclusionZone.left &&
        this.x - this.size < exclusionZone.right &&
        this.y + this.size > exclusionZone.top &&
        this.y - this.size < exclusionZone.bottom
      ) {
        this.directionx = -this.directionx;
        this.directiony = -this.directiony;
      }

      // Répulsion avec la souris
      if (pointer.x !== null && pointer.y !== null) {
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const avoidRadius = 100; // Rayon d'influence autour du pointeur
        if (distance < avoidRadius) {
          this.repelled = true;

          // Appliquer une force proportionnelle à la proximité
          const angle = Math.atan2(dy, dx);
          const force = (avoidRadius - distance) / avoidRadius; // Normaliser la force
          this.directionx += force * Math.cos(angle);
          this.directiony += force * Math.sin(angle);
        }
      }

      // Atténuer la vitesse après répulsion
      if (this.repelled) {
        this.directionx *= 0.98; // Réduction progressive
        this.directiony *= 0.98;

        if (
          Math.abs(this.directionx) < 0.1 &&
          Math.abs(this.directiony) < 0.1
        ) {
          this.repelled = false; // Rétablir l'état normal
        }
      }

      // Mise à jour de la position
      this.x += this.directionx;
      this.y += this.directiony;

      this.draw(ctx);
    },
  });

  const initParticles = (
    canvas: HTMLCanvasElement,
    exclusionZone: DOMRect | null
  ) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 250; i++) {
      const size = (Math.random() + 0.01) * 25;
      let x = Math.random() * (canvas.width - size * 2);
      let y = Math.random() * (canvas.height - size * 2);

      if (
        exclusionZone &&
        x + size > exclusionZone.left &&
        x - size < exclusionZone.right &&
        y + size > exclusionZone.top &&
        y - size < exclusionZone.bottom
      ) {
        x = exclusionZone.right + size;
        y = exclusionZone.bottom + size;
      }

      const directionx = Math.random() * 0.4 - 0.2;
      const directiony = Math.random() * 0.4 - 0.2;
      const color = getRandomColor();

      newParticles.push(
        createParticle(x, y, directionx, directiony, size, color)
      );
    }
    particles.current = newParticles;
  };

  const animate = (
    canvas: HTMLCanvasElement,
    exclusionZone: DOMRect | null
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      particles.current.forEach((particle) =>
        particle.update(
          ctx,
          canvasWidth,
          canvasHeight,
          exclusionZone,
          pointer.current
        )
      );
      requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const exclusionZoneElement = document.querySelector(".hover-title");
    const exclusionZone = exclusionZoneElement
      ? exclusionZoneElement.getBoundingClientRect()
      : null;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initParticles(canvas, exclusionZone);
      animate(canvas, exclusionZone);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const updatedExclusionZone = exclusionZoneElement
          ? exclusionZoneElement.getBoundingClientRect()
          : null;
        initParticles(canvas, updatedExclusionZone);
      };

      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.current.x = event.clientX - rect.left;
        pointer.current.y = event.clientY - rect.top;
      };

      const handleMouseLeave = () => {
        pointer.current.x = null;
        pointer.current.y = null;
      };

      window.addEventListener("resize", handleResize);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default ParticleCanvas;
