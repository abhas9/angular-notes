import LocalStorageService from '../../services/LocalStorageService';

class NavbarController {
  constructor($stateParams) {
  	console.log($stateParams);
  	this.notesList = LocalStorageService.notesList;
    this.name = 'navbar';
  }
  addNote() {
  	LocalStorageService.addNewNote();
  }
  update($event, id) {
  	LocalStorageService.updateNotesTitleById(id, $event.currentTarget.innerText)
  }
}

NavbarController.$inject = ['$stateParams'];

export default NavbarController;
