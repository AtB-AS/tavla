import React from 'react'

import { TextField, TextArea } from '@entur/form'
import { PrimaryButton } from '@entur/button'
import { ValidationCheckIcon } from '@entur/icons'
import { Link } from 'react-router-dom'
import querystring from 'querystring'

import PageWrapper from '../PageWrapper'
import './styles.scss'

const FeedbackPage = (): JSX.Element => {
    const query = querystring.parse(window.location.search)

    return (
        <div className="feedback-page">
            <PageWrapper>
                {query['?success'] == 'true' ? (
                    <div className="feedback-page__success">
                        <ValidationCheckIcon></ValidationCheckIcon>
                        <p>Din tilbakemelding er sendt</p>
                        <p>
                            Takk for at du er med på å gjøre tavla enda bedre!
                        </p>
                        <Link to="/">
                            <PrimaryButton>Tilbake</PrimaryButton>
                        </Link>
                    </div>
                ) : (
                    <form action="" method="post">
                        <p>
                            Fyll ut boksene nedenfor og gi oss din
                            tilbakemelding.
                        </p>
                        <div className="feedback-page__flex">
                            <TextField placeholder="Navn" type="text" />
                            <TextField placeholder="Epost" type="email" />
                        </div>
                        <TextArea placeholder="Skriv din tilbakemelding..." />

                        <PrimaryButton
                            className="feedback-page__submit"
                            type="submit"
                        >
                            Send
                        </PrimaryButton>
                    </form>
                )}
            </PageWrapper>
        </div>
    )
}

export default FeedbackPage
