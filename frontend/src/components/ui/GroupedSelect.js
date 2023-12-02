import React from 'react';

import Select from 'react-select'

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const GroupedSelect = ({
  groupedOptions,
  defaultValue,
  onChange,
  ...rest
}) => {

  return (
    <Select
      defaultValue={defaultValue}
      options={groupedOptions}
      formatGroupLabel={formatGroupLabel}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : '#b3b2ba',
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        })
      }}
      onChange={onChange}
      {...rest}
    />
  );

}

export default GroupedSelect;