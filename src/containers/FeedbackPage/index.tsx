import React from 'react'

import { TextField, TextArea } from '@entur/form'
import { PrimaryButton } from '@entur/button'
import { ValidationCheckIcon, ValidationErrorIcon } from '@entur/icons'
import { Link } from 'react-router-dom'
import querystring from 'querystring'

import PageWrapper from '../PageWrapper'
import './styles.scss'

const FeedbackPage = (): JSX.Element => {
    const query = querystring.parse(window.location.search.substr(1))

    if (query['success'] === 'true') {
        return (
            <div className="feedback-page">
                <PageWrapper>
                    <div className="feedback-page__result">
                        <ValidationCheckIcon></ValidationCheckIcon>
                        <p>Din tilbakemelding er sendt</p>
                        <p>
                            Takk for at du er med på å gjøre tavla enda bedre!
                        </p>
                        <Link to="/">
                            <PrimaryButton>Tilbake</PrimaryButton>
                        </Link>
                    </div>
                </PageWrapper>
            </div>
        )
    } else if (query['success'] === 'false') {
        return (
            <div className="feedback-page">
                <PageWrapper>
                    <div className="feedback-page__result">
                        <ValidationErrorIcon className="error"></ValidationErrorIcon>
                        <p>Oops! Noe gikk galt.</p>
                        <p>Feilmelding: {query['err']}</p>
                        <Link to="/feedback">
                            <PrimaryButton>Tilbake</PrimaryButton>
                        </Link>
                    </div>
                </PageWrapper>
            </div>
        )
    }

    return (
        <div className="feedback-page">
            <PageWrapper>
                <form
                    action="https://europe-west1-atb-mobility-platform.cloudfunctions.net/TavlaFormSubmission"
                    method="post"
                >
                    <p>
                        Fyll ut boksene nedenfor og gi oss din tilbakemelding.
                    </p>
                    <div className="feedback-page__flex">
                        <TextField name="name" placeholder="Navn" type="text" />
                        <TextField
                            name="email"
                            placeholder="E-post"
                            type="email"
                        />
                    </div>
                    <TextArea
                        name="body"
                        placeholder="Skriv din tilbakemelding..."
                    />

                    <PrimaryButton
                        className="feedback-page__submit"
                        type="submit"
                    >
                        Send
                    </PrimaryButton>
                </form>
            </PageWrapper>
        </div>
    )
}

export default FeedbackPage
