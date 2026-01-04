import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Header.css'

export default function Header() {
    const { i18n } = useTranslation()
    const [isLangOpen, setIsLangOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'ru', name: 'RU' },
        { code: 'he', name: 'HE' }
    ]

    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0]

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        setIsLangOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false)
            }
        }

        if (isLangOpen) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isLangOpen])

    return (
        <header className='Header'>
            <div className='header-content'>
                <Link to="/" className='logo'>
                    <span className='logo-icon'></span>
                    <span className='logo-text'>Catan Generator</span>
                </Link>

                <div className='language-dropdown' ref={dropdownRef}>
                    <button
                        className='lang-button'
                        onClick={() => setIsLangOpen(!isLangOpen)}
                    >
                        {currentLang.name}
                    </button>

                    {isLangOpen && (
                        <div className='lang-menu'>
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={i18n.language === lang.code ? 'active' : ''}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}