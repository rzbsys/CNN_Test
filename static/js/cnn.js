var Label_CNT = 2;
var parr;
var Label = ['With-Mask', 'Without-Mask'];

function Add_progress(i, pre_data) {
  html = format('<div class="recommend" id="Clk"><h3>라벨 <span id="Label">{0}</span></h3><br><div><h2 id="Stat">{1}%</h2><br><progress value="{1}", max="100"></progress></div></div><hr>', Label[i], pre_data);
  $('.rec').append(html);
}

function pre_print(arr) {
  parr = arr;
  for (var i = 0; i < Label_CNT; i++) {
    console.log(arr[0][i]);
    Add_progress(i, arr[0][i] * 100);
  }
  sel(1);
}

function loadFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img_base64 = e.target.result;
      $('#Input').attr('src', img_base64);
      $('#Input').css('filter', 'invert(0)');
      var base64_code = img_base64.split(',')[1];
      $.ajax({
        url: '/upload',
        type: 'POST',
        dataType: 'json',
        data: {
          IMG: base64_code,
          NAME: $('#File_Upload').val(),
        },
        success: function (data) {
          $('#Pre_Processing').css('filter', 'invert(0)');
          $('#Pre_Processing').attr('src', img_base64.split(',')[0] + ',' + data['DATA']);
          pre_print(data['PRE']);
        },
        error: function (e) {
          sel(3);
          $('#ecode').text('CODE : ' + e.status);
        },
      });
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    alert('파일 업로드 오류 발생');
  }

  sel(4);

  var target = document.getElementById('File_Upload');
  target.disabled = true;
  $('.img-btn').css('background-color', 'rgb(240, 240, 240)');
  $('.img-btn').css('color', 'rgb(190, 190, 190)');
  $('.img-btn').css('cursor', 'not-allowed');
}
