import React, { useState } from 'react'

import ErrorWrapper from '.'
import LoginModal from '../../components/LoginModal'

import illustration from './../../assets/images/illustration-light.svg'
import villeVeier from './../../assets/images/ville-veier-light.svg'

import { useUser } from '../../auth'
import firebase from 'firebase/app'
import { useToast } from '@entur/alert'
import { getDocumentId } from '../../utils'

export function LockedTavle({ history }: Props): JSX.Element {
    const user = useUser()
    const userLoggedin = Boolean(user && !user.isAnonymous)
    const documentId = getDocumentId()
    const { addToast } = useToast()

    const [displayLogin, setDisplayLogin] = useState<boolean>(false)
    const callback = !userLoggedin
        ? (event: React.SyntheticEvent<HTMLButtonElement>): void => {
              event.preventDefault()
              setDisplayLogin(true)
          }
        : (event: React.SyntheticEvent<HTMLButtonElement>): void => {
              event.preventDefault()
              addToast({
                  title: 'Logget ut',
                  content: 'Du er nå logget ut av din konto.',
                  variant: 'success',
              })
              firebase
                  .auth()
                  .signOut()
                  .then(history.push(`/t/${documentId}`))
          }
    const callbackMessage = !userLoggedin ? 'Logg inn' : 'Logg ut'

    const loginModal = !userLoggedin ? (
        <LoginModal
            open={displayLogin}
            onDismiss={(): void => setDisplayLogin(false)}
            loginCase="error"
        />
    ) : null

    const errorMessage = !userLoggedin
        ? 'Tavla du forsøker å redigere er låst til en konto. Om det er din tavle, må du først logge inn for å redigere den.'
        : 'Tavla du forsøker å redigere er låst til en annen konto. Om det er din tavle, må du logge inn på denne kontoen for å redigere den.'

    return (
        <div>
            {loginModal}
            <ErrorWrapper
                title="Oi! Denne tavla er låst."
                message={errorMessage}
                image={illustration}
                callbackMessage={callbackMessage}
                callback={callback}
            />
        </div>
    )
}

export function PageDoesNotExist({ history }: Props): JSX.Element {
    const callback = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        history.push(`/`)
    }
    return (
        <div>
            <ErrorWrapper
                title="Her var det tomt!"
                message="Det finnes ingen tavle på denne url-en. Du kan lage en avgangstavle ved å trykke på knappen nedenfor."
                image={villeVeier}
                callbackMessage="Gå tilbake"
                callback={callback}
            />
        </div>
    )
}

export function NoStopsOnTavle(): JSX.Element {
    return (
        <div>
            <ErrorWrapper
                title="Nå havnet vi på ville veier."
                message="Vi finner ingen holdeplasser å vise på denne tavla. Rediger tavla eller prøv et nytt søk."
                image={villeVeier}
            />
        </div>
    )
}

export function NoTavlerAvailable({ history }: Props): JSX.Element {
    const callback = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        history.push(`/`)
    }
    return (
        <div>
            <ErrorWrapper
                title="Her var det tomt!"
                message="Du har ingen tavler som er lagret på denne kontoen. Trykk på knappen nedenfor for å lage en avgangstavle."
                image={illustration}
                callbackMessage="Lag en ny tavle"
                callback={callback}
            />
        </div>
    )
}

export function NoAccessToTavler(): JSX.Element {
    const [displayLogin, setDisplayLogin] = useState<boolean>(false)
    const callback = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        setDisplayLogin(true)
    }
    const loginModal = (
        <LoginModal
            open={displayLogin}
            onDismiss={(): void => setDisplayLogin(false)}
            loginCase="error"
        />
    )

    return (
        <div>
            {loginModal}
            <ErrorWrapper
                title="Lenger kommer du ikke!"
                message="Du er ikke logget inn, og kan derfor ikke se dine tavler. Trykk på knappen nedenfor for å logge inn."
                image={illustration}
                callbackMessage="Logg inn"
                callback={callback}
            />
        </div>
    )
}

interface Props {
    history: any
}
