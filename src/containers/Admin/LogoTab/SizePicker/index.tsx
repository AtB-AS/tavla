import React, { ChangeEvent } from 'react'

import { RadioGroup, Radio } from '@entur/form'

import { useSettingsContext } from '../../../../settings'

import './styles.scss'

const SizePicker = (): JSX.Element => {
    const [settings, { setLogoSize }] = useSettingsContext()

    const { logoSize = '32px' } = settings || {}

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogoSize(event.target.value)
    }

    return (
        <RadioGroup
            name="logo-size"
            label="Størrelse på logo"
            onChange={handleChange}
            value={logoSize}
            className="eds-label"
        >
            <Radio value="32px">
                <span className="eds-label__eds-paragraph">32px</span>
            </Radio>
            <Radio value="66px">
                <span className="eds-label__eds-paragraph">66px</span>
            </Radio>
        </RadioGroup>
    )
}

export default SizePicker
