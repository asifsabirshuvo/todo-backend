--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

-- Started on 2021-08-27 14:46:52 +06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 634 (class 1247 OID 16699)
-- Name: enum_subtask_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_subtask_status AS ENUM (
    'pending',
    'completed'
);


ALTER TYPE public.enum_subtask_status OWNER TO postgres;

--
-- TOC entry 627 (class 1247 OID 16684)
-- Name: enum_todo_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_todo_status AS ENUM (
    'pending',
    'completed'
);


ALTER TYPE public.enum_todo_status OWNER TO postgres;

--
-- TOC entry 624 (class 1247 OID 16401)
-- Name: statusenum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.statusenum AS ENUM (
    'pending',
    'completed'
);


ALTER TYPE public.statusenum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16705)
-- Name: subtask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtask (
    id integer NOT NULL,
    title character varying(255),
    status public.enum_subtask_status DEFAULT 'pending'::public.enum_subtask_status,
    created_on timestamp with time zone,
    "todoId" integer
);


ALTER TABLE public.subtask OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16703)
-- Name: subtask_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtask_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subtask_id_seq OWNER TO postgres;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 204
-- Name: subtask_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtask_id_seq OWNED BY public.subtask.id;


--
-- TOC entry 203 (class 1259 OID 16691)
-- Name: todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo (
    id integer NOT NULL,
    title character varying(255),
    status public.enum_todo_status DEFAULT 'pending'::public.enum_todo_status,
    created_on timestamp with time zone
);


ALTER TABLE public.todo OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16689)
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_id_seq OWNER TO postgres;

--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 202
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;


--
-- TOC entry 2851 (class 2604 OID 16708)
-- Name: subtask id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask ALTER COLUMN id SET DEFAULT nextval('public.subtask_id_seq'::regclass);


--
-- TOC entry 2849 (class 2604 OID 16694)
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- TOC entry 2987 (class 0 OID 16705)
-- Dependencies: 205
-- Data for Name: subtask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subtask (id, title, status, created_on, "todoId") FROM stdin;
3	morning subtask	completed	2021-08-25 15:41:45.394+06	2
4	take a bath	pending	2021-08-27 12:35:24.303+06	3
5	lunch	completed	2021-08-27 12:37:00.599+06	3
6	eat dinner 	pending	2021-08-27 12:38:08.391+06	6
7	sleep well	pending	2021-08-27 12:38:13.614+06	6
1	mimions subtask	completed	2021-08-25 15:41:35.033+06	1
2	best subtask	completed	2021-08-25 15:41:39.009+06	1
\.


--
-- TOC entry 2985 (class 0 OID 16691)
-- Dependencies: 203
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todo (id, title, status, created_on) FROM stdin;
3	my daily todo	pending	2021-08-25 15:41:27.789+06
6	night tasks	pending	2021-08-27 12:37:38.898+06
1	best todo	completed	2021-08-25 15:41:15.961+06
2	wow todo	completed	2021-08-25 15:41:21.25+06
\.


--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 204
-- Name: subtask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtask_id_seq', 7, true);


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 202
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todo_id_seq', 6, true);


--
-- TOC entry 2856 (class 2606 OID 16711)
-- Name: subtask subtask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask
    ADD CONSTRAINT subtask_pkey PRIMARY KEY (id);


--
-- TOC entry 2854 (class 2606 OID 16697)
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- TOC entry 2857 (class 2606 OID 16712)
-- Name: subtask subtask_todoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask
    ADD CONSTRAINT "subtask_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES public.todo(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2021-08-27 14:46:53 +06

--
-- PostgreSQL database dump complete
--

