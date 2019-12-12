import React, {useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {saveNewDownloadUrl} from "../../store/actions/settings";
import {connect} from "react-redux";
import {Transition} from "react-transition-group";
import css from './SettingsForm.module.scss'

const SettingsForm = ({downloadUrl, saveNewDownloadUrl}) => {
  const [isSaved, toggleSaved] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: downloadUrl
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().url().required()
    }),
    onSubmit: values => {
      toggleSaved(true);
      saveNewDownloadUrl(values.url);

      setTimeout(() => {
        toggleSaved(false);
      }, 1000)
    }
  });

  const isShowErrors = formik.errors.url && formik.touched.url;

  //TODO Сделать вывод Saved когда когда урл сохранился

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="url">URL to CSV File</label>
        <input
          type="text"
          className={`form-control ${isShowErrors ? 'is-invalid' : ''}`}
          name="url"
          id="url"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.url}
          autoComplete="off"
        />
        {isShowErrors && <small className="invalid-feedback">{formik.errors.url}</small>}
      </div>
      <button className="btn btn-primary mr-2" type="submit" disabled={!formik.isValid}>Save</button>
      <Transition in={isSaved} timeout={500}>
        {state => (
          <span className={`text-muted red ${css.savedMark} ${state}`}>Saved...</span>
        )}
      </Transition>

    </form>
  );
};

function mapStateToProps(state) {
    return {
      downloadUrl: state.settings.downloadUrl
    }
}

function mapDispatchToProps(dispatch) {
    return {
      saveNewDownloadUrl: (url) => dispatch(saveNewDownloadUrl(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
