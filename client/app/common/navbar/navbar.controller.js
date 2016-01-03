import LocalStorageService from '../../services/LocalStorageService';

class NavbarController {
  constructor($state) {
  	this.notesList = LocalStorageService.notesList;
    this.$state = $state;
    this.name = 'navbar';
  }
  addNote() {
  	LocalStorageService.addNewNote();
  }
  update($event, id) {
  	LocalStorageService.updateNotesTitleById(id, $event.currentTarget.innerText);
  }
  deleteNote($event, id) {
    LocalStorageService.deleteNoteById(id);
    this.$state.go('home', {id: ''});
  }
}

NavbarController.$inject = ['$state'];

export default NavbarController;
