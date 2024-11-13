$(document).on('click', "img[alt='authForm']", function(e) {
  const form = `<form name="auth">
                <input id="authpswd" type="text" />
                <button type="submit" name="submit">get access</button>
                </form>`

  if (!$("form[name='auth']").length) {
    $('.wrapper__auth_to_load_present').append(form);
  }
  else {
    $("form[name='auth']").remove();
  }
  e.preventDefault();

});


$(document).on('submit', "form[name='uploader']", function(e) {
  e.preventDefault();
  const form = this;
  const lastString = $(form).closest('.gost__item').find('.gost-text:last')[0]
  const path = lastString.getAttribute('href')

  if($(form).find("#filedata")[0].files[0].size > 1024 * 1024 * 100){
    $(form).find("#result").html("Размер файла превышен");
    return
  }


  const formData = new FormData();
  formData.append('my_file_upload', $(form).find("#filedata")[0].files[0]);
  formData.append('newPathRel', path.split('/').slice(0, -1).join('/'));
  formData.append('newPathAbs', path.split('/').slice(1, -1).join('/'));

  $(form).find("#result").html("Идёт загрузка");

  $.ajax({
      url: '../html/fileAdd.php?uploadfiles',
      type: 'POST',
      data: formData,
      success: function(msg){
        if (msg.error == '') {

          $(form).find("#result").html("Презентация загружена");

          $.ajax({
            url: '../html/add.php',
            type: 'POST',
            data: { newData: msg.success, searchName: lastString.innerHTML, searchLink: lastString.getAttribute('href') },
            success: function(res){
              if (res.error == '') {
                $(form).find("#result").html("Разметка обновлена");
              }
              else {
                $(form).find("#result").html(msg.error);
              }
            },
            dataType : 'json',
          })

        } else {
          $(form).find("#result").html(msg.error);
        }
      },
      cache: false,
      contentType: false,
      processData: false,
      dataType : 'json',
  });
});


$(document).on('click', "div[data-name='daletePresent']", function(e) {
  const form = this;
  const lastString = $(form).prev()[0]
  const path = lastString.getAttribute('href')
  const nameFile = lastString.innerHTML;

  const formData = new FormData();
  formData.append('newPathAbs', path.split('/').slice(1).join('/'));
  formData.append('nameFile', nameFile);

  $(form).parent().parent().parent().find("#result").html("Идёт удаление");

  $.ajax({
      url: '../html/fileRemove.php',
      type: 'DELETE',
      data: JSON.stringify({
        newPathAbs: path.split('/').slice(1).join('/'),
        nameFile: nameFile
      }),
      success: function(msg){
        if (msg.error == '') {

          $(form).parent().parent().parent().find("#result").html("Файл удален");

          $.ajax({
            url: '../html/remove.php',
            type: 'DELETE',
            data: JSON.stringify({ newData: msg.success }),
            success: function(res){
              if (res.error == '') {
                $(form).parent().parent().parent().find("#result").html("Разметка обновлена");
              }
              else {
                $(form).parent().parent().parent().find("#result").html(res.error);
              }
            },
            dataType : 'json',
          })

        } else {
          $(form).parent().parent().parent().find("#result").html(msg.error);
        }
      },
      contentType: 'application/json',
      dataType : 'json',
  });
  e.preventDefault();
});


$(document).on('submit', "form[name='auth']", function(e) {
// $("form[name='auth']").submit(function(e) {
  const pswd =  $("#authpswd").val();
  const form = `<form name="uploader" enctype="multipart/form-data">
                  <input id="filedata" type="file" />
                  <button type="submit" name="submit">Загрузить</button>
                  <div id="result"></div>
                </form>`
  $.ajax({
    url: '../js/pswd.txt',
    dataType: 'text',

    success: function (data) {
      if(pswd == data){
        $("form[name='auth']").hide();
        $("div[data-name='daletePresent']").each(function() {
          $(this).css("display", "block");
        });
        $('.gost__item').append(form);
      }
    }
  });

  e.preventDefault();

});



