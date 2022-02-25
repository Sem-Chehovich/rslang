import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as SprintActionCreators from '../store/action-creators/sprint';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(SprintActionCreators, dispatch);
}