import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressApi from "../../../../api/progress.api";
import {
  getProgress,
  getSections,
} from "../../../../redux/actions/learning.actions";

const LectureItem = ({ lecture }) => {
  const dispatch = useDispatch();
  const { dataCourse } = useSelector((state) => state.learning);

  const [checked, setChecked] = useState({
    value: lecture.progress?.progress ? true : false,
    loading: false,
  });

  function handleChecked(e) {
    const value = e.target.checked;
    setChecked((state) => ({
      ...state,
      loading: true,
    }));

    ProgressApi.updateProgress({
      lectureId: lecture.id,
      progress: value,
    }).then(() => {
      const {
        course: { id },
      } = dataCourse;
      setChecked((state) => ({
        ...state,
        value,
        loading: false,
      }));

      dispatch(getProgress(id));
      dispatch(getSections(id));
    });
  }

  return (
    <li className="curriculum-item {{ $key == 0 && $lecture->order == 1 ? 'is-current' : '' }} d-flex">
      <div className="progress-toggle">
        <label htmlFor={`lecture-${lecture.id}`}>
          <input
            checked={checked.value}
            type="checkbox"
            id={`lecture-${lecture.id}`}
            onChange={handleChecked}
            disabled={checked.loading ? true : false}
          />
          <span></span>
        </label>
      </div>
      <div className="link">
        <div className="text">
          {lecture.order}.&nbsp;{lecture.title}
        </div>
        <div className="bottom d-flex align-items-center">
          {/* <div className="duration">
            <i className="fas fa-play-circle"></i>
            <span className="times">15min</span>
          </div> */}

          {lecture.resource.length > 0 && (
            <div className="resource-list">
              <button className="dropdown d-flex align-items-center">
                <i className="fas fa-folder-open"></i>
                Resources
                <i className="fas fa-chevron-down"></i>
              </button>

              <ul className="list">
                {lecture.resource.map((resource) => (
                  <li>
                    <button className="d-flex download-btn align-items-center">
                      <i className="fas fa-file-download"></i>
                      <div className="filename">
                        {resource.original_filename}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default LectureItem;
