import React from 'react'
import {Link} from 'react-router-dom'

const UserAgreement = () => {
    return (
        <div className="user-agreement_container">
            <div className="user-agreement_title_container">
                <div className="user-agreement_title">
                    Reddit User Agreement
                </div>

            </div>
            <div className="user-agreement_date">
                Effective October 15, 2020. Last Revised September 15, 2020
            </div>
            <div className="user-agreement_notice">
                Reddit powers hundreds of thousands of distinct online communities.<br/>This User Agreement and your conduct make that possible.
            </div>
            <div>
                Hello, redditors and people of the Internet! This Reddit User Agreement (“Terms”) applies to your access to and use of the websites, mobile apps, widgets, APIs, emails, and other online products and services (collectively, the “Services”) provided by Reddit, Inc. (“Reddit,” “we,” “us,” or “our”).
            </div>
            <div>
                Remember Reddit is for fun and is intended to be a place for your entertainment, but we still need some basic rules. By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.
            </div>
            <div>
                Please take a look at Reddit’s {' '}
                <Link to="/policy/privacy-policy">
                Privacy Policy
                </Link>
                {' '} too—it explains how and why we collect, use, and share information about you when you access or use our Services.
            </div>
            <div className="user-agreement_bullet">
                1. Your Access to the Services
            </div>
            <div>
                Children under the age of 13 are not allowed to create an Account or otherwise use the Services. Additionally, you must be over the age required by the laws of your country to create an account or otherwise use the Services, or we need to have received verifiable consent from your parent or legal guardian.
            </div>
            <div>
                In addition, certain of our Services or portions of our Services require you to be 18 years of age or older, so please read all notices and any Additional Terms carefully when you access the Services.
            </div>
            <div>
                If you are accepting these Terms on behalf of another legal entity, including a business or government entity, you represent that you have full legal authority to bind such entity to these Terms.
            </div>
            <div className="user-agreement_bullet">
                2. Your Use of the Services
            </div>
            <div>
                Reddit grants you a personal, non-transferable, non-exclusive, revocable, limited license to use and access the Services solely as permitted by these Terms. We reserve all rights not expressly granted to you by these Terms.
            </div>
            <div>
                Except as permitted through the Services or as otherwise permitted by us in writing, your license does not include the right to:
                <ul>
                    license, sell, transfer, assign, distribute, host, or otherwise commercially exploit the Services or Content;
                </ul>
                <ul>
                    modify, prepare derivative works of, disassemble, decompile, or reverse engineer any part of the Services or Content; or
                </ul>
                <ul>
                    access the Services or Content in order to build a similar or competitive website, product, or service, except as permitted under the Reddit API Terms of Use.
                </ul>
            </div>
            <div>
                We reserve the right to modify, suspend, or discontinue the Services (in whole or in part) at any time, with or without notice to you. Any future release, update, or other addition to functionality of the Services will be subject to these Terms, which may be updated from time to time. You agree that we will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Services or any part thereof.
            </div>
            <div className="user-agreement_bullet">
                3. Your Reddit Account and Account Security
            </div>
            <div>
                To use certain features of our Services, you may be required to create a Reddit account (an “Account”) and provide us with a username, password, and certain other information about yourself as set forth in the {' '}
                <Link to="/policy/privacy-policy">
                    Privacy Policy
                </Link>
                .
            </div>
            <div>
                You are solely responsible for the information associated with your Account and anything that happens related to your Account. You must maintain the security of your Account and immediately notify Reddit if you discover or suspect that someone has accessed your Account without your permission. We recommend that you use a strong password that is used only with your Account and enable two-factor authentication.
            </div>
            <div>
                You will not license, sell, or transfer your Account without our prior written approval.
            </div>
            <div className="user-agreement_bullet">
                4. Your Content
            </div>
            <div>
                The Services may contain information, text, links, graphics, photos, videos, or other materials (“Content”), including Content created or submitted to the Services by you or through your Account (“Your Content”). We take no responsibility for and we do not expressly or implicitly endorse, support, or guarantee the completeness, truthfulness, accuracy, or reliability of any of Your Content.
            </div>
            <div>
                By submitting Your Content to the Services, you represent and warrant that you have all rights, power, and authority necessary to grant the rights to Your Content contained within these Terms. Because you alone are responsible for Your Content, you may expose yourself to liability if you post or share Content without all necessary rights.
            </div>
            <div>
                You retain any ownership rights you have in Your Content, but you grant Reddit the following license to use that Content:
            </div>
            <div>
                When Your Content is created with or submitted to the Services, you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable license to use, copy, modify, adapt, prepare derivative works of, distribute, store, perform, and display Your Content and any name, username, voice, or likeness provided in connection with Your Content in all media formats and channels now known or later developed anywhere in the world. This license includes the right for us to make Your Content available for syndication, broadcast, distribution, or publication by other companies, organizations, or individuals who partner with Reddit. You also agree that we may remove metadata associated with Your Content, and you irrevocably waive any claims and assertions of moral rights or attribution with respect to Your Content.
            </div>
            <div>
                Any ideas, suggestions, and feedback about Reddit or our Services that you provide to us are entirely voluntary, and you agree that Reddit may use such ideas, suggestions, and feedback without compensation or obligation to you.
            </div>
            <div>
                Although we have no obligation to screen, edit, or monitor Your Content, we may, in our sole discretion, delete or remove Your Content at any time and for any reason, including for violating these Terms, violating our Content Policy, or if you otherwise create or are likely to create liability for us.
            </div>
            <div className="user-agreement_bullet">
                5. Third-Party Content, Advertisements, and Promotions
            </div>
            <div>
                The Services may contain links to third-party websites, products, or services, which may be posted by advertisers, our affiliates, our partners, or other users (“Third-Party Content”). Third-Party Content is not under our control, and we are not responsible for any third party’s websites, products, or services. Your use of Third-Party Content is at your own risk and you should make any investigation you feel necessary before proceeding with any transaction in connection with such Third-Party Content.
            </div>
            <div>
                The Services may also contain sponsored Third-Party Content or advertisements. The type, degree, and targeting of advertisements are subject to change, and you acknowledge and agree that we may place advertisements in connection with the display of any Content or information on the Services, including Your Content.
            </div>
            <div>
                If you choose to use the Services to conduct a promotion, including a contest or sweepstakes (“Promotion”), you alone are responsible for conducting the Promotion in compliance with all applicable laws and regulations at your own risk. Your Promotion must state that the Promotion is not sponsored by, endorsed by, or associated with Reddit, and the rules for your Promotion must require each entrant or participant to release Reddit from any liability related to the Promotion.
            </div>

        </div>
    )
}



export default UserAgreement
