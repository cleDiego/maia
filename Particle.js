class Particle {
  constructor(xr = [10, 150], yr = [10, 150]) {
    this.position = { x: wCenter, y: hCenter };
    this.wCenter = wCenter;
    this.hCenter = hCenter;
    this.xRadius = randNumberBetween(xr[0], xr[1]);
    this.yRadius = randNumberBetween(yr[0], yr[1]);
    this.xr = this.xRadius;
    this.yr = this.yRadius;

    this.amplitude = randNumberBetween(3, 8);
    this.frequency = randNumberBetween(12, 24, true);
    this.distorce = 0;
    this.speed = randNumberBetween(0.008, 0.005);
    this.color = randNumberBetween(180, 210, true) + ',' + randNumberBetween(50, 100, true) + '%,' + randNumberBetween(50, 100, true) + '%';
    this.width = randNumberBetween(0.5, 1.2);
    this.length = randNumberBetween(10, 20);
    this.theta = randNumberBetween(0, pi2());
    this.lastPositions = [this.position];
    this.control = false;
    this.lineWidthRings = 0;
  }

  calcPosition() { 
    if (this.theta > pi2()) this.theta = 0;
    this.theta += this.speed;

    if (randNumberBetween(0, 1) > 0.999 && !this.control) {
      //this.amplitude *= -1;
      //this.speed *= -1;
      //this.xr *= 1.2;
      //this.yr *= 1.2;
      this.control = true;

    }
    else if (randNumberBetween(0, 1) > 0.99 && this.control) {
      this.control = false;
    }

    this.xr += this.distorce; //.xRadius + distorceE > this.xr ? this.xRadius + distorceE : this.xr;
    this.yr += this.distorce; //.yRadius + distorceE > this.yr ? this.yRadius + distorceE : this.yr;
    let d = Math.sqrt(Math.pow((this.xRadius - this.xr), 2) + Math.pow((this.yRadius - this.yr), 2));
    if (this.xr > this.xRadius) this.xr -= 0.01 * d;
    if (this.yr > this.yRadius) this.yr -= 0.01 * d;


    let rx = this.xr + ((this.amplitude) * Math.sin(this.frequency * this.theta));
    let ry = this.yr + ((this.amplitude) * Math.sin(this.frequency * this.theta));
    let x = this.wCenter + rx * Math.cos(this.theta);
    let y = this.hCenter + ry * Math.sin(this.theta);
    this.position = { x: x, y: y };
    this.lastPositions.unshift(this.position);
  }

  drawParticle() {
    let lp = this.width;
    for (let i = 0; i < this.lastPositions.length; i++) {
      let r = this.lastPositions[i];
      //alpha -= alpha/this.length;
      if (lp == this.width) {
        ctx.beginPath();
        let g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, lp * 3);
        g.addColorStop(0, 'hsla(' + this.color + ',' + randNumberBetween(0.1, 1) + ')');
        g.addColorStop(1, 'hsla(' + this.color + ',0)');
        ctx.arc(r.x, r.y, lp * 4, 0, pi2());
        ctx.fillStyle = g;
        ctx.fill();
        ctx.closePath();
      }
      lp -= this.width / (this.lastPositions.length);
      ctx.beginPath();
      ctx.fillRect(r.x, r.y, lp, lp);
      ctx.fillStyle = 'hsla(' + this.color + ',1)';
      ctx.closePath();
    }
    if (this.lastPositions.length > this.length) this.lastPositions.pop();
  }

  drawConnection(particles = []) {
    ctx.beginPath();
    let rp = null;
    let dd = null;
    let p = this.position;
    for (let i = 0; i < particles.length; i++) {
      let pp = particles[i].position;
      let d = Math.pow((pp.x - p.x), 2) + Math.pow((pp.y - p.y), 2);
      if (!dd || d < dd) {
        dd = d;
        rp = pp;
      }
    }
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(rp.x, rp.y);
    ctx.strokeStyle = 'hsla(' + this.color + ','+0.1+(this.distorce)+')';
    ctx.lineWidth = 1 + (this.distorce);
    ctx.stroke();
    ctx.closePath();


    /*
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
        let r = particles[i];
        let rp = null;
        let dd = null;

        for (let j = 0; j < particles.length; j++) {
            let p = r.position;
            let pp = particles[j].position;
            let dSquared = Math.pow((pp.x - p.x), 2) + Math.pow((pp.y - p.y), 2);

            if (!dd || dSquared < dd) {
                dd = dSquared;
                rp = particles[j];
            }
        }
        let rx = r.position.x;
        let ry = r.position.y;
        ctx.moveTo(rx, ry);
        ctx.lineTo(rp.position.x, rp.position.y);
        ctx.strokeStyle = 'hsla(' + r.color + ',0.3)';
    }
    ctx.stroke();
    ctx.closePath();
    */
  }

  drawRing() {
    let r = this;
    ctx.beginPath();
    r.lineWidthRings = r.distorce;

    if(r.lineWidthRings > 0) r.lineWidthRings -= 0.01 * (Math.pow((r.x - this.wCenter), 2) + Math.pow((r.y - this.hCenter), 2));
    ctx.lineWidth = r.lineWidthRings;
    ctx.strokeStyle = 'hsla('+r.color+','+(0.01 + (r.distorce/10000))+')';
    
    for (let theta = 0; theta <= pi2()+0.1; theta += 0.01) {
        let rx = r.xr + (r.amplitude) * Math.sin(r.frequency * theta);
        let ry = r.yr + (r.amplitude) * Math.sin(r.frequency * theta);
        let x = r.wCenter + rx * Math.cos(theta);
        let y = r.hCenter + ry * Math.sin(theta);
        ctx.lineTo(x, y);
        
    }
    ctx.stroke();
    ctx.closePath();
  }
}
