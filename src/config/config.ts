import dotenv from "dotenv";
import path from "path";
import Joi from "@hapi/joi";

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number().default(7).description('days after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    HUBSPOT_ENABLED: Joi.string().default(false),
    HUBSPOT_API_KEY: Joi.string().description('Hubspot API Key'),
    MAILGUN_ENABLED: Joi.boolean().default(false),
    MAILGUN_API_KEY: Joi.string().description('MailGun API Key'),
    MAILGUN_DOMAIN: Joi.string().description('MailGun Domain'),
    STRIPE_SECRET_KEY: Joi.string().description('Stripe Secret Key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST,
  mongoose: {
    url: envVars.NODE_ENV !== 'test' ? envVars.MONGODB_URL :  envVars.MONGODB_URL_TEST,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    mailgun: {
      enabled: envVars.MAILGUN_ENABLED,
      apiKey: envVars.MAILGUN_API_KEY,
      domain: envVars.MAILGUN_DOMAIN,
    },
  },
  payment: {
    stripe: {
      secretKey: envVars.STRIPE_SECRET_KEY,
    },
  },
  hubspot: {
    enabled: envVars.HUBSPOT_ENABLED,
    apiKey: envVars.HUBSPOT_API_KEY || '',
  },
};
