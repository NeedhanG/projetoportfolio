// Arquivo: BrainCanvas.js

const BrainCanvas = () => {
  const canvasRef = React.useRef(null);
  const linesRef = React.useRef([]);
  const mouseRef = React.useRef({ x: null, y: null });
  const animationFrameId = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let pulse = 0;
    let pulseDirection = 1;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();

    class Line {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.offset = Math.random() * 100;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = "#00faff";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00faff";
        ctx.stroke();
        const progress = (Date.now() / 20 + this.offset) % 100 / 100;
        const glowX = canvas.width / 2 + (this.x - canvas.width / 2) * progress;
        const glowY = canvas.height / 2 + (this.y - canvas.height / 2) * progress;
        ctx.beginPath();
        ctx.arc(glowX, glowY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#00faff";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00faff";
        ctx.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        this.draw();
      }
      redirect(targetX, targetY) {
        if (targetX === null || targetY === null) return;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(angle) * 2;
        this.vy = Math.sin(angle) * 2;
      }
    }

    linesRef.current = [];
    for (let i = 0; i < 60; i++) {
      linesRef.current.push(new Line(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      bgGradient.addColorStop(0, "rgba(25,0,70,0.4)");
      bgGradient.addColorStop(1, "rgba(0,0,0,0.9)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      pulse += pulseDirection * 0.2;
      if (pulse > 10 || pulse < -10) pulseDirection *= -1;
      const radius = 70 + pulse;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 20,
        canvas.width / 2, canvas.height / 2, radius
      );
      gradient.addColorStop(0, "rgba(255,0,255,0.9)");
      gradient.addColorStop(1, "rgba(100,0,255,0.3)");
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 60;
      ctx.shadowColor = "#ff00ff";
      ctx.fill();
      linesRef.current.forEach((line) => line.update());
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      linesRef.current.forEach((line) => line.redirect(mouseRef.current.x, mouseRef.current.y));
    };
    const handleTouchMove = (e) => {
      mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      linesRef.current.forEach((line) => line.redirect(mouseRef.current.x, mouseRef.current.y));
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};