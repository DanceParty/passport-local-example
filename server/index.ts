import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import * as PassportLocal from "passport-local";
import cors from "cors";
import * as dotenv from "dotenv";
import { Pool } from "pg";
import e from "express";

dotenv.config();

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    function (username: string, password: string, done: any) {
      const query = {
        text: "SELECT * FROM account WHERE username = $1",
        values: [username],
      };
      pool.query(query, (error, result: any) => {
        if (error) {
          console.log("passport.use(LocalStrategy) error: ", error);
          return done(null, false);
        } else {
          console.log("passport.use(LocalStrategy) success!");
          const user = result.rows[0];
          return done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log("serialize user");
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  console.log("deserialize user");
  const query = {
    text: "SELECT * FROM account WHERE id = $1",
    values: [id],
  };
  pool.query(query, (error, result) => {
    console.log(`query for user by id ${id}`);
    if (error) {
      console.log("error in deserialize user", error);
      return done(error);
    } else {
      console.log("found user", result.rows[0]);
      done(null, result.rows[0]);
    }
  });
});

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;

app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;
  const query = {
    text: "INSERT INTO account(username, password) VALUES($1, $2)",
    values: [username, password],
  };
  pool.query(query, (error, result) => {
    if (error) {
      res.sendStatus(400);
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("successful login!~");
        console.log(req.session);
        res.sendStatus(200);
      });
    }
  });
});

app.get("/auth/me", (req, res) => {
  console.log("is authenticated?", req.isAuthenticated());
  console.log(req.user);
  console.log(req.session);
  res.send(200);
});

app.post(
  "/auth/login",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("succesfull login!");
    console.log(req.session);
  }
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
