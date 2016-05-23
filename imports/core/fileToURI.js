import { curry } from 'ramda';

export default curry(function fileToURI(state, tempPath, file) {
  file.preventDefault();
  const files = [ ...file.target.files ];
  const imgFile = files[0];
  const reader = new FileReader;
  // when the reader has loaded then I will call the
  // redux form img.onChange function.
  // I had to remove the {...img} from this input, since
  // the onBlur function will change the imageURI back to
  // the actual File object.
  reader.onload = () => {
    state.onChange(reader.result);
  };
  reader.readAsDataURL(imgFile);
})