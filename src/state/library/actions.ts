import { CreateLibraryArgs } from '../../services/library';
import { Library, LibraryComponentPair } from '../../types/library';
import { createAsyncAction, createAsyncActionConstant, createUIAction } from '../actionCreators';

export const SHOW_CREATE_LIBRARY_MODAL = 'LIBRARY/SHOW_CREATE_LIBRARY_MODAL';
export const CREATE_LIBRARY = createAsyncActionConstant('LIBRARY/CREATE_LIBRARY');
export const FETCH_LIBRARIES = createAsyncActionConstant('LIBRARY/FETCH_LIBRARIES');
export const UPDATE_LIBRARY = createAsyncActionConstant('LIBRARY/UPDATE_LIBRARY');
export const DELETE_LIBRARY = createAsyncActionConstant('LIBRARY/DELETE_LIBRARY');
export const ADD_COMPONENT = createAsyncActionConstant('LIBRARY/ADD_COMPONENT');
export const FETCH_COMPONENTS = createAsyncActionConstant('LIBRARY/FETCH_COMPONENTS');
export const SELECT_LIBRARY = 'LIBRARY/SELECT_LIBRARY';
export const REMOVE_COMPONENT = createAsyncActionConstant('LIBRARY/REMOVE_COMPONENT');
export const SELECT_THEME = 'THEME/SELECT_THEME';

export const showEditLibraryModalAction = createUIAction<{ show: boolean, libraryId?: string }>(SHOW_CREATE_LIBRARY_MODAL);
export const createLibraryAction = createAsyncAction<CreateLibraryArgs, Library, void>(CREATE_LIBRARY);
export const fetchUserLibrariesAction = createAsyncAction<void, Library[], void>(FETCH_LIBRARIES);
export const updateLibraryAction = createAsyncAction<{ library: Library }, { library: Library }>(UPDATE_LIBRARY);
export const deleteLibraryAction = createAsyncAction<{ libraryId: string }, { libraryId: string }>(DELETE_LIBRARY);
export const addComponentAction = createAsyncAction<LibraryComponentPair, LibraryComponentPair>(ADD_COMPONENT);
export const fetchComponentsAction = createAsyncAction<{ libraryId: string }, { libraryId: string, componentIds: string[] }>(FETCH_COMPONENTS);
export const selectLibraryAction = createUIAction<{ libraryId: string }>(SELECT_LIBRARY);
export const removeComponentAction = createAsyncAction<LibraryComponentPair, LibraryComponentPair>(REMOVE_COMPONENT);
export const selectThemeAction = createUIAction<{ libraryId: string, themeId: string }>(SELECT_THEME);