"use server"

import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";

const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
}

export async function generateEmailBody(product: EmailProductInfo, type: NotificationType){
    
    const shortenedTitle = product.title.length > 20
    ? `${product.title.substring(0, 20)}...`
    : product.title;

    let subject = '';
    let body = '';

    switch (type) {
        case Notification.WELCOME:
            subject = 'Welcome to our notification service!';
            body = `Welcome to our notification service! We're excited to have you on board.`;
            break;
        case Notification.CHANGE_OF_STOCK:
            subject = 'Stock price change';
            body = `The stock ${shortenedTitle} has changed its price. Visit ${product.url} for more information.`;
            break;
        case Notification.LOWEST_PRICE:
            subject = 'Lowest price alert';
            body = `The stock ${shortenedTitle} has reached its lowest price. Visit ${product.url} for more information.`;
            break;
        case Notification.THRESHOLD_MET:
            subject = 'Threshold met';
            body = `The stock ${shortenedTitle} has reached the threshold price. Visit ${product.url} for more information.`;
            break;
        default:
            throw new Error('Invalid notification type');
    }

    return {subject, body}

}

const transporter = nodemailer.createTransport({
    pool:true,
    service: 'hotmail',
    port: 2525,
    auth: {
        user: "newdevcoding@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 1,
})

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: 'newdevcoding@gmail.com',
        to: sendTo,
        html: emailContent.body,
        subject: emailContent.subject,
    }

    transporter.sendEmail(mailOptions, (error: any, info: any) => {
        if (error) return console.log(error);
        console.log('Email sent: ', info)
    })
}