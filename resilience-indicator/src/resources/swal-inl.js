import Swal from 'sweetalert2';

class SwalINL {
  static successAlert(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  static successTimerAlert(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 2000,
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

  static surveySubmitAlert(confirmButtonText, cancelButtonText, score) {
    return Swal.fire({
      icon: 'success',
      title: `Your resilience score is ${score}/100`,
      text: 'Congratulations on completing the survey!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'green',
      cancelButtonText,
      confirmButtonText,
    });
  }
}

export const {
  successAlert, successTimerAlert, errorAlert, warningAlert, surveySubmitAlert,
} = SwalINL;
export default SwalINL;
