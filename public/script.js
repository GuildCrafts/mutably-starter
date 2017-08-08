$(document).ready(function(){

$('button.editButton').on('click', () => {
  $('button.editButton').addClass('invisible')
  $('button.saveButton').removeClass('invisible')
})

$('button.saveButton').on('click', () => {
  // $('button.saveButton').toggle()
  $('button.saveButton').addClass('invisible')
  $('button.editButton').removeClass('invisible')
})

});
