window.onload = function(){
  const nota = document.querySelector('.notification');
  const close = document.querySelector('.close');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  let p = document.querySelector('.text-container');
  let position = document.querySelector('.position');
  let i = 0;
  let checbox = document.querySelector('[type=checkbox]');
  const array = [
    'Lorem ipsum dolor sit amet. Quos dolores eos, qui in ea commodi autem.',
    'Lorem ipsum dolor sit amet.',
    'Natus error sit voluptatem sequi nesciunt neque.',
    'Officia deserunt mollitia animi, id est eligendi.',
    'Sit voluptatem sequi nesciunt, neque porro quisquam.',
    '#1-Sit voluptatem sequi nesciunt, neque porro quisquam.'
];
  //start value
  p.innerHTML = array[0];
  position.innerHTML = i+1;
  nota.style.display = 'none';
  //function show
  setTimeout(() => {
    if(localStorage.getItem('checked')){
      nota.style.displa = 'none';
    }
    else {
      nota.style.display = 'block';
    }
  }, 5000);
  //close function
  close.addEventListener('click',() => {
    if(checbox.checked){
      localStorage.setItem('checked', true);
    }
    //nota.style.display = 'none';
    nota.remove();
  }, false);
  // navigation
  const nav = document.querySelector('.nav-circle');
  let selectedSpan = nav.firstElementChild;
  // help function
  const highlight = function(node){
    if(selectedSpan){
      selectedSpan.classList.remove('active');
    }
    selectedSpan = node;
    selectedSpan.classList.add('active');
  }
  nav.addEventListener('click',function(event){
    let target = event.target;
    while(target !== this){
      if(target.tagName === 'SPAN'){
        highlight(target);
        i = target.dataset.value;
        p.innerHTML = array[i];
        position.innerHTML = parseInt(i)+1;
        return;
      }
      target = target.parentNode;
    }
  },false);

  function right(){
  if(i === array.length-1) i = 0;
  else i = ++i;
  highlight(nav.children[i]);
  p.innerHTML = array[i];
  position.innerHTML = i+1;
  }
  function left(){
  if(i === 0) {
    i = array.length - 1;
  }
  else i = --i;
  highlight(nav.children[i]);
  p.innerHTML = array[i];
  position.innerHTML = i+1;
  }
  function checkKeyPress(key){
    if(key.keyCode === 27){
      if(checbox.checked){
        localStorage.setItem('checked', true);
      }
      nota.style.display = 'none';
    }
    if(key.keyCode === 37){
      left();
    }
    if(key.keyCode === 39){
      right();
    }
    if(key.keyCode === 32){
      event.preventDefault();
      checbox.checked = !checbox.checked;
    }
  }

  next.addEventListener('click', right,false);
  prev.addEventListener('click', left,false);
  window.addEventListener('keydown', checkKeyPress, false);
}
