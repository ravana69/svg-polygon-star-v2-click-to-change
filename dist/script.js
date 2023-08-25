let nPts = 12; // varies based on click

const nPoly = 75,
      radius = 200,
      invert = 1.65, // 0.5 - 2.5 for best results
      maxPts = 17;

for (let i=1; i<=nPoly; i++){ //make + animate empty polygon elements
  let p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  stage.appendChild(p);  
  
  gsap.set(p, {
    attr:{ class:'p p'+i },
    scale:()=>2-2*(i/nPoly),
    fill:()=>(i%2==0)?'#fff':'#000'
  });
  
  let tl = gsap.timeline({ defaults:{ease:'power4.inOut'} });
  
  tl.to(p, {duration:3-i/nPoly*0.33, rotation:180}, 0)
    .to(p, {duration:3-i/nPoly*0.33, rotation:360}, 3)
    .call((t)=>{ t.play(0) }, [tl], 6)
}

function setPts(){ //define polygon points attribute
  let pts = [];
  
  ( nPts > maxPts ) ? nPts=8 : nPts+=2;
  
  for (let i=0; i<nPts; i++){
    const angle = (i/nPts * Math.PI *2)- Math.PI/2;
    const x = Math.cos(angle)*(radius/(invert+i%2));
    const y = Math.sin(angle)*(radius/(invert+i%2));
    pts.push( x + ',' + y + ' ');
  }

  gsap.set('.p', {x:250, y:250, attr:{points:pts}});
}

window.onclick = window.onload = setPts;