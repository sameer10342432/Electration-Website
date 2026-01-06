import type { Express } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { User } from "@shared/schema";
import { storage } from "./storage";

const scryptAsync = promisify(scrypt);

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "super_secret_key_123",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: process.env.NODE_ENV === "production",
        },
    };

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    // Hardcoded Admin User
    const ADMIN_USER = {
        id: 1,
        username: "sameerliaqat81@gmail.com",
        password: "21cfea69ca9a5d0b930b3b7b8af19873:b27bdf82a235a91dafd150f8daba86534f0b331f3c8761c88ee2199cf597b74e418f2e6a2ff87dca3bd330d281f2600229255bd36f1848434282518cfe22bf98",
        isAdmin: true
    };

    async function comparePasswords(supplied: string, hashed: string) {
        const [salt, key] = hashed.split(":");
        const b64Key = Buffer.from(key, "hex");
        const b64Salt = Buffer.from(salt, "hex");
        const derivedKey = (await scryptAsync(supplied, b64Salt, 64)) as Buffer;
        return timingSafeEqual(b64Key, derivedKey);
    }

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const isPasswordValid = await comparePasswords(password, ADMIN_USER.password);
            if (username === ADMIN_USER.username && isPasswordValid) {
                return done(null, ADMIN_USER);
            }
            return done(null, false, { message: "Invalid username or password" });
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, (user as any).id);
    });

    passport.deserializeUser(async (id, done) => {
        if (id === ADMIN_USER.id) {
            done(null, ADMIN_USER);
        } else {
            done(null, false);
        }
    });

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err: any, user: any, info: any) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: "Invalid credentials" });
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({ message: "Logged in successfully", user });
            });
        })(req, res, next);
    });

    app.get("/api/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect("/login");
        });
    });

    app.get("/api/auth/user", (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).json({ message: "Not authenticated" });
        }
    });
}
