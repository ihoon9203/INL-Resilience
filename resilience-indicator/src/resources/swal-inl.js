import Swal from 'sweetalert2';

class SwalINL {
  static successAlert(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  static errorAlert(message) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  static warningAlert(text, confirmButtonText) {
    return Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
    });
  }
}

export const { successAlert, errorAlert, warningAlert } = SwalINL;
export default SwalINL;
