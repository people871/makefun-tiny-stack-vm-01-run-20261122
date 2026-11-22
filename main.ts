import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function run(p,inp){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),d=new Uint8Array(12);
let sp=0,cp=0,ol=0,ip=0,pc=0,st=0;const n=p.length;
const end=(c)=>[o.slice(0,ol),c];
for(;;){
if(st===1e6)return end(10);
if(pc<0||pc>=n)return end(9);
const op=p[pc];
if(op>7&&!(op>=16&&op<=34)&&!(op>=48&&op<=52)&&!(op>=64&&op<=65)&&!(op>=80&&op<=83))return end(5);
const im=op===1?1:op===2?4:op>=48&&op<=51?2:0;
if(pc+im>=n)return end(9);
st++;
const nx=pc+1+im;
const u=op===7?3:(op===3||op===4||op===23||op===27||op===49||op===50||op===64||op===80||op===81||op===83)?1:(op===5||op===6||op===65||(op>=16&&op<=34&&op!==23&&op!==27))?2:0;
const w=op===1||op===2||op===82?1:op===4||op===5?2:op===6||op===7?3:(op>=16&&op<=34)||op===64?1:0;
if(sp<u)return end(2);
if(sp-u+w>256)return end(3);
pc=nx;
switch(op){
case 0:return end(0);
case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
case 2:D[sp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:sp--;break;
case 4:D[sp]=D[sp-1];sp++;break;
case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;break;}
case 6:D[sp]=D[sp-2];sp++;break;
case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;break;}
case 23:D[sp-1]=-D[sp-1]|0;break;
case 27:D[sp-1]=~D[sp-1];break;
case 48:case 49:case 50:{
const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
let t=op===48;
if(op!==48){const v=D[--sp];t=op===49?v===0:v!==0;}
if(t)pc=nx+rel;
break;}
case 51:if(cp===64)return end(7);C[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:if(cp===0)return end(8);pc=C[--cp];break;
case 64:{const a=D[sp-1];if(a<0||a>255)return end(6);D[sp-1]=M[a];break;}
case 65:{const a=D[sp-1],v=D[sp-2];if(a<0||a>255)return end(6);sp-=2;M[a]=v;break;}
case 80:{
let v=D[sp-1],k=0;const g=v<0;let x=g?-v:v;
if(x===0)d[k++]=48;else while(x>0){d[k++]=48+x%10;x=Math.floor(x/10);}
if(ol+k+(g?1:0)>65536)return end(11);
sp--;
if(g)o[ol++]=45;
while(k>0)o[ol++]=d[--k];
break;}
case 81:if(ol+1>65536)return end(11);o[ol++]=D[--sp]&255;break;
case 82:D[sp++]=ip<inp.length?inp[ip++]:-1;break;
case 83:return end(D[--sp]&255);
default:{
const b=D[sp-1],a=D[sp-2];let r;
if(op===16)r=a+b|0;
else if(op===17)r=a-b|0;
else if(op===18)r=Math.imul(a,b);
else if(op===19){if(b===0)return end(4);r=a===-2147483648&&b===-1?a:(a/b)|0;}
else if(op===20){if(b===0)return end(4);r=b===-1?0:a%b|0;}
else if(op===21){if(b===0)return end(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(op===22){if(b===0)return end(4);r=(a>>>0)%(b>>>0)|0;}
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=a>>>(b&31)|0;
else if(op===32)r=a===b?1:0;
else if(op===33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
sp-=2;D[sp++]=r;break;}
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r[0]);
writeFileSync(join(O,id,'exit.txt'),r[1]+'\n');
}
