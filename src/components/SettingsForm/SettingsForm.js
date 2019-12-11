import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {saveNewDownloadUrl} from "../../store/actions/settings";
import {connect} from "react-redux";
// import css from './SettingsForm.module.scss'

const SettingsForm = ({downloadUrl, saveNewDownloadUrl}) => {
  console.log(downloadUrl);

  const formik = useFormik({
    initialValues: {
      url: downloadUrl
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().url().required()
    }),
    onSubmit: values => {
      saveNewDownloadUrl(values.url);
    }
  });

  const isShowErrors = formik.errors.url && formik.touched.url;

  //TODO Сделать вывод Saved когда когда урл сохранился
  //TODO Сделать так чтоб валидационная ощибка не отодвигала кнопку вниз

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
      <button className="btn btn-primary" type="submit" disabled={!formik.isValid}>Save</button>
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
