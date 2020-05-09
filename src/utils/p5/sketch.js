
import lilac from './flowers/lilac';
import daisy from './flowers/daisy';
import jasmine from './flowers/jasmine';
import lily from './flowers/lily';
import rose from './flowers/rose';
import orangeBlossom from './flowers/orangeblossom';
import daffodil from './flowers/daffodil';
import tallFlower from './flowers/tallflower';

function sketch (p) {
  const myRandom = p.random([0,1,2,3,4,5,6,7])
  if(myRandom == 0){
    daisy(p)
  }else if(myRandom == 1){
    lilac(p)
  } else if(myRandom == 2){
  	jasmine(p)
  } else if(myRandom == 3){
  	lily(p)
  } else if(myRandom == 4){
  	rose(p)
  } else if(myRandom == 5){
  	orangeBlossom(p)
  } else if(myRandom == 6){
  	daffodil(p)
  } else{
  	tallFlower(p)
  }
};


export default sketch