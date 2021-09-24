import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useField } from 'formik';
import { FormHelperText } from '@material-ui/core';
import ClassicEditor from '../ckeditor5/build/ckeditor';
import { CKEDITOR_CUSTOM_CONFIG } from '../../utils/constants';
import Show from '../show';
import { isFunction } from '../../utils/helper';

function MyCKEditor({ onHandleChange, height, ...props }) {
  const [field, meta, helper] = useField(props);

  const handleReadyState = (editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle(
        'min-height',
        height,
        editor.editing.view.document.getRoot()
      );
    });
    editor.editing.view.change((writer) => {
      writer.setStyle('color', 'black', editor.editing.view.document.getRoot());
    });
  };

  const handleChange = (event, editor) => {
    helper.setValue(editor.getData());
    if (isFunction(onHandleChange)) onHandleChange(event, editor);
  };

  delete field.onChange;
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={field.value}
        config={CKEDITOR_CUSTOM_CONFIG}
        onReady={handleReadyState}
        onChange={handleChange}
        {...props}
        {...field}
      />
      <Show IF={meta.touched && meta.error}>
        <FormHelperText error>{meta.error}</FormHelperText>
      </Show>
    </>
  );
}

MyCKEditor.propTypes = {
  onHandleChange: PropTypes.func,
  height: PropTypes.string,
};
MyCKEditor.defaultProps = {
  height: '30vh',
};

export default memo(MyCKEditor);
