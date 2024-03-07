

// eslint-disable-next-line react/prop-types
export default function CheckBox({checked, onChange, label}) {

    return <>
        <div className={'my-4'}>
            <input type="checkbox"
                   id='checkboxCase'
                   checked={checked}
                   className='form-check-input form-check-inline form-check-inline-block '
                   onChange={e => onChange(e.target.checked)}
            />
            <label htmlFor={'checkboxCase'} className={'form-check-label'}> {label} </label>

        </div>
    </>
}
