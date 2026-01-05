import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    const { i18n } = useTranslation()

    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'ru', name: 'RU' },
        { code: 'he', name: 'HE' }
    ]

    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0]

    const toggleLanguage = () => {
        const currentIndex = languages.findIndex(lang => lang.code === i18n.language)
        const nextIndex = (currentIndex + 1) % languages.length
        i18n.changeLanguage(languages[nextIndex].code)
    }

    return (
        <header className='Header'>
            <div className='header-content'>
                <Link to="/" className='logo'>
                    <span className='logo-icon'>
                        <img src="/assets/logo.png" alt="Catan Generator Logo" />
                    </span>
                </Link>

                <div className='language-dropdown'>
                    <button
                        className='lang-button'
                        onClick={toggleLanguage}
                    >
                        {currentLang.name}
                    </button>
                </div>
            </div>
        </header>
    )
}