import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import ActivityLogItem from "~/components/MainScreen/ActivityLogItem/ActivityLogItem";
import ActivitiesEditor from "~/components/ActivitiesEditor/ActivitiesEditor";
import PasswordChangeForm from "./PasswordChangeForm";
import LangSelector from "~/components/LangSelector/LangSelector";
import ToolDialog from "~/components/ToolDialog/ToolDialog";
import { LanguageContext } from "~/components/App";
import { createLangGetter } from "~/tools/tools";

import './MainScreen.scss';
import "~/components/dialog.scss";

export default function MainScreen(props) {
    const {
        setLanguage,

        loadActivities,
        loadLog,

        user,
        logout,

        activities,
        activityLog,

        isActivitiesDialogShown,
        editActivitiesButtonPressed,
        activitiesDialogCancelButtonPressed,
        saveActivities,

        isPasswordDialogShown,
        passwordChangeButtonPressed,
        passwordDialogCancelButtonPressed,
        passwordChange,
    } = props;

    const lang = createLangGetter(useContext(LanguageContext));

    useEffect(() => {
        loadActivities();
        loadLog();
    }, [loadActivities, loadLog]);

    const [isMenuOpen, setMenuState] = useState(false);
    const [isLangSelectorShown, setLangSelectorState] = useState(false);

    return (
        <div className="screen-wrapper">
            <div className="screen-header">
                <div className="screen-header__item">
                    {renderMenuButton()}
                </div>
                <div className="screen-header__item">
                    {lang('ms-hi')}, <b>{user.name}</b>
                </div>
            </div>

            {isMenuOpen && renderMenu()}

            <div className="screen-body">
                <div className="screen-body__block">
                    <div className="screen-body__title">{lang('ms-today')}</div>
                    <Activities />
                </div>
                <div className="screen-body__block">
                    <div className="screen-body__title">{lang('ms-recently')}</div>
                    {activityLog.map((item, index) => (
                        <ActivityLogItem item={item} key={index} />
                    ))}
                </div>
            </div>

            <div className="screen-footer">
                <div className="screen-footer__item">
                    <span>{lang('ms-powered-by')}</span>
                    <span className="screen-footer__react-icon" title="React"/>
                    <span className="screen-footer__node-icon" title="Node.js"/>
                </div>
                <div className="screen-footer__item">
                    <a href="https://github.com/blrop/activities-calendar" target="_blank" rel="noopener noreferrer">{lang('ms-source')}</a>
                </div>
            </div>

            {isActivitiesDialogShown && <ActivitiesEditor
                activities={activities}
                onSubmit={saveActivities}
                onClose={activitiesDialogCancelButtonPressed}
            />}

            {isPasswordDialogShown && <PasswordChangeForm
                onSubmit={passwordChange}
                onClose={passwordDialogCancelButtonPressed}
            />}

            {isLangSelectorShown && (
                <ToolDialog closeCallback={hideLanguageSelector}>
                    <LangSelector onSelect={onLanguageSelect}/>
                </ToolDialog>
            )}
        </div>
    );

    function renderMenu() {
        return (
            <div className="screen-menu">
                <button
                    className="screen-menu__item"
                    onClick={editActivitiesButtonPressed}
                >
                    {lang('ms-edit-activities')}
                </button>
                <button
                    className="screen-menu__item"
                    onClick={passwordChangeButtonPressed}
                >
                    {lang('ms-change-password')}
                </button>
                <button
                    className="screen-menu__item"
                    onClick={showLanguageSelector}
                >
                    {lang('ms-choose-lang')}
                </button>
                <button
                    className="screen-menu__item"
                    onClick={logout}
                >
                    {lang('ms-logout')}
                </button>
            </div>
        );
    }

    function renderMenuButton() {
        return (
            <button
                className={classNames(
                    'screen-header__menu-button', {
                        'icon-menu': !isMenuOpen,
                        'icon-close': isMenuOpen,
                    }
                )}
                aria-label={isMenuOpen ? lang('ms-close') : lang('ms-menu')}
                onClick={toggleMenuState}
            />
        );
    }

    function toggleMenuState() {
        setMenuState(!isMenuOpen);
    }

    function showLanguageSelector() {
        setLangSelectorState(true);
    }

    function hideLanguageSelector() {
        setLangSelectorState(false);
    }

    function onLanguageSelect(langCode) {
        setLanguage(langCode);
        setLangSelectorState(false);
    }
}

MainScreen.propTypes = {
    setLanguage: PropTypes.func.isRequired,

    loadActivities: PropTypes.func.isRequired,
    loadLog: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,

    activities: PropTypes.array.isRequired,
    activityLog: PropTypes.array.isRequired,

    isActivitiesDialogShown: PropTypes.bool.isRequired,
    editActivitiesButtonPressed: PropTypes.func.isRequired,
    activitiesDialogCancelButtonPressed: PropTypes.func.isRequired,
    saveActivities: PropTypes.func.isRequired,

    isPasswordDialogShown: PropTypes.bool.isRequired,
    passwordChangeButtonPressed: PropTypes.func.isRequired,
    passwordDialogCancelButtonPressed: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
};

MainScreen.defaultProps = {
    activities: [],
};