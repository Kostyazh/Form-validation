 document.addEventListener('DOMContentLoaded', function(){
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend (e) {
e.preventDefault();
let error = formValidate(form);

if(error === 0){

}else{
  alert('Заполните обязательные поля');
}
   }

   function formValidate(form){
     let error = 0;
     let formReq = document.querySelectorAll('._req');

     for (let index = 0; index < formReq.length; index++){
       const input = formReq[index];
       formRemoveError(input);


       if(input.classList.contains('_email')){
         if(emailTest(input)){
           formAddError(input);
           error++;
         }
       }else if (input.getAttribute('type') === 'checkbox' && input.checked === false ) {
         formAddError(input);
         error++;
       }else{
         if(input.value === ''){
           formAddError(input);
           error++;
         }
       }
     }
     return error;
   }

   function formAddError(input){
     input.parentElement.classList.add('_error');
     input.classList.add('_error');
   }

   function formRemoveError(input){
     input.parentElement.classList.remove('_error');
     input.classList.remove('_error');
   }

   function emailTest(input){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
   }

   //Preview

   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');

   formImage.addEventListener('change', () => {
     uploadFile(formImage.files[0]);
   });

   function uploadFile(file){
     //проверка типа файла
     if(!['image/jpeg','image/png','image/gif'].includes(file.type)){
alert('only img');
       formImage.value = '';
       return;
     }
     //проверка размера файла
    if(file.size > 2 * 1024 * 1024){
      alert('file must less 2mb');
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e){
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
    };

reader.onerror = function (e) {
  alert('error');
};
reader.readAsDataURL(file);
   }
});
