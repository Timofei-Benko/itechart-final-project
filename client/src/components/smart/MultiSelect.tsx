import React from "react";
import WindowedSelect from 'react-windowed-select';

import LANGUAGES from '../../data/languages';

const MultiSelect = (props): JSX.Element => {

    const options = LANGUAGES.map(language => (
        { label: language, value: language }
    ));

    const { languageList, setLanguageList } = props;

    return (
        <WindowedSelect
            options={ options }
            value={ languageList }
            onChange={ setLanguageList }
            isMulti
            closeMenuOnSelect={ false }
            placeholder={'Preferred Languages'}
            styles={{
                placeholder: (provided, _state) => ({
                    ...provided,
                    fontSize: '14px'
                }),
                input: (provided, _state) => ({
                    ...provided,
                    fontSize: '14px',
                }),
                control: (provided, _state) => ({
                    ...provided,
                    minHeight: '40px',
                    backgroundColor: '#f9f9fa',
                    boxShadow: 'none',
                    transition: 'none',
                    ':hover': {
                        borderColor: 'black'
                    }
                }),
                container: (provided, _state) => ({
                    ...provided,
                    transition: 'none',
                }),
                indicatorContainer: (provided, _state) => ({
                    ...provided,
                    transition: 'none',
                }),
            }}
            theme={ theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: 'lightcoral',
                    primary: 'black',
                },
            }) }
        />
    );
};

export default MultiSelect;