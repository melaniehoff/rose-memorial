
import lilac from './flowers/lilac';
import daisy from './flowers/daisy';
/*------------------*/
/*------------------*/
/* FLOWER CODE */
function sketch (p) {
  if(p.random([true,false])){
    daisy(p)
  }else{
    lilac(p)
  }
  
};
/* END FLOWER CODE */
/*------------------*/
/*------------------*/

export default sketch