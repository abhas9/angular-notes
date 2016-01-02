import LocalStorageService from '../../services/LocalStorageService';
import {markdown} from 'markdown';
import angular from 'angular'

class PreviewController {
    constructor($stateParams, $sce) {
    this.$sce = $sce;
    if (!$stateParams.id) {
        this.disabled = true;
    } else {
        this.id = $stateParams.id;
        this.note = LocalStorageService.getNotesByID($stateParams.id);
        this.notFound = angular.equals({}, this.note);
        this.preview = true;
    }
  }
  get previewContent() {
    return this.$sce.trustAsHtml(markdown.toHTML(this.note.data.content));
  }
  get rawContent() {
    return this.$sce.trustAsHtml(this.note.data.content.replace(/\n/g,"<br />"));
  }
  contentFocus() {
    this.preview = false;
  }
  contentBlur($event, id) {
    this.preview = true;
    this.note.data.content = $event.currentTarget.innerText;
    LocalStorageService.updateNotesContentById(id, this.note.data.content);
  }
  contentChange($event) {
    this.note.data.content = $event.currentTarget.innerText;
  }
  cleanPaste($event) {
    $event.preventDefault();
    let text = $event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }
  titleBlur($event, id) {
    this.note.metadata.title = $event.currentTarget.textContent;
    LocalStorageService.updateNotesTitleById(id, this.note.metadata.title);
  }
}

PreviewController.$inject = ['$stateParams', '$sce'];

export default PreviewController;
