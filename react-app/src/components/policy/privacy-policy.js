import React from 'react'
import {Link} from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy_container">
            <div className="privacy-policy_title_container">
                <div className="privacy-policy_title">
                    Reddit Privacy Policy
                </div>
            </div>
            <div className="privacy-policy_date">
                Effective October 15, 2020. Last Revised September 15, 2020
            </div>
            <div className="privacy-policy_notice">
                We want you to understand how and why Reddit, Inc. (“Reddit,” “we” or “us”) collects, uses, and shares information about you when you use our sites, mobile apps, widgets, and other online products and services (collectively, the "Services") or when you otherwise interact with us or receive a communication from us. This Privacy Policy applies to all of our Services including Reddit Gifts, which maintains a separate privacy notice that incorporates this Privacy Policy by reference.
            </div>
            <div className="privacy-policy_bullet">
                What We Collect (and How it is Used and Shared)
            </div>
            <div className="privacy-policy_info_container">
                <div className="privacy-policy_info_header">
                    <div className="privacy-policy_info_header_title">
                        Information You Provide to Us
                    </div>
                    <div className="privacy-policy_info_header_info">
                        We collect information you provide to us directly when you use the Services. This includes:
                    </div>
                </div>
                <div className="privacy-policy_item_container">
                    <div className="privacy-policy_item_format">
                        <div className="privacy-policy-item_title">
                            Account Information
                        </div>
                        <div className="privacy-policy-item_info">
                            If you create a Reddit account, we may require you to provide a username and password. Your username is public, and it doesn’t have to be related to your real name. You may also provide other account information, like an email address, bio, or profile picture. We also store your user account preferences and settings.
                        </div>
                    </div>
                    <div className="privacy-policy_item_format">
                        <div className="privacy-policy-item_title">
                            Content you submit
                        </div>
                        <div className="privacy-policy-item_info">
                            We collect the content you submit to the Services. This includes your posts and comments including saved drafts, videos you broadcast via RPAN, your messages with other users (e.g., private messages, chats, and modmail), and your reports and other communications with moderators and with us. Your content may include text, links, images, gifs, and videos.
                        </div>

                    </div>
                    <div className="privacy-policy_item_format">
                        <div className="privacy-policy-item_title">
                            Actions you take
                        </div>
                        <div className="privacy-policy-item_info">
                            We collect information about the actions you take when using the Services. This includes your interactions with content, like voting, saving, hiding, and reporting. It also includes your interactions with other users, such as following, friending, and blocking. We collect your interactions with communities, like your subscriptions or moderator status.
                        </div>

                    </div>
                    <div className="privacy-policy_item_format">
                        <div className="privacy-policy-item_title">
                            Transactional information
                        </div>
                        <div className="privacy-policy-item_info">
                            If you purchase products or services from us (e.g., Reddit Premium or Reddit Coins), we will collect certain information from you, including your name, address, email address, and information about the product or service you are purchasing. Reddit uses industry-standard payment processor services (for example, Stripe) to handle payment information.
                        </div>

                    </div>
                    <div className="privacy-policy_item_format">
                        <div className="privacy-policy-item_title">
                            Other information
                        </div>
                        <div className="privacy-policy-item_info">
                            You may choose to provide other information directly to us. For example, we may collect information when you fill out a form, participate in Reddit-sponsored activities or promotions, apply for a job, request customer support, or otherwise communicate with us.
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default PrivacyPolicy
