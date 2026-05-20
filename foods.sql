--
-- PostgreSQL database dump
--

\restrict iVe2lVFLy1D9amNR85vfCY1qYhJ2J79AKiFs9y0gjW4iSOvKCJ9HnEWSNNcUZEP

-- Dumped from database version 15.18 (Debian 15.18-1.pgdg13+1)
-- Dumped by pg_dump version 18.4

-- Started on 2026-05-20 10:57:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16431)
-- Name: foods; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public.foods (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    protein numeric(6,2) NOT NULL,
    carbs numeric(6,2) NOT NULL,
    fats numeric(6,2) NOT NULL,
    calories_per_100g numeric(6,2) NOT NULL,
    user_id bigint
);


ALTER TABLE public.foods OWNER TO appuser;

--
-- TOC entry 218 (class 1259 OID 16430)
-- Name: foods_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public.foods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foods_id_seq OWNER TO appuser;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 218
-- Name: foods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;


--
-- TOC entry 3344 (class 2604 OID 16434)
-- Name: foods id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);


--
-- TOC entry 3493 (class 0 OID 16431)
-- Dependencies: 219
-- Data for Name: foods; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public.foods (id, name, protein, carbs, fats, calories_per_100g, user_id) FROM stdin;
2	Cơm sườn	31.00	1.00	3.20	165.00	\N
4	Cơm tấm	31.00	1.00	3.20	165.00	\N
5	Bún chả	6.10	4.40	17.90	136.00	\N
6	Bún cua	2.10	9.10	0.90	53.00	\N
7	Bún đậu	3.00	20.30	6.40	53.00	\N
8	Bún nem	3.30	17.80	3.90	120.00	\N
9	Cháo lòng	1.40	6.00	4.40	69.00	\N
10	Cơm rang	6.00	21.80	9.60	198.00	\N
11	Bún bò Nam bộ	3.20	15.70	0.60	81.00	\N
12	Bánh mì xíu mại	11.30	19.00	7.50	189.00	\N
13	ức gà	31.70	0.10	6.50	186.00	\N
14	Trứng vịt	13.00	2.90	12.00	172.00	\N
15	Trứng gà ta	12.90	1.30	10.30	150.00	\N
16	Cơm trắng	2.70	28.20	0.30	130.00	\N
18	Ổi	0.60	12.90	0.70	61.00	\N
17	Táo	0.80	9.20	0.10	40.00	\N
19	Coca cola	0.10	1.00	0.10	42.00	\N
20	Nước cam	0.70	4.00	0.20	23.00	\N
21	Cà phê sữa	2.30	90.00	0.30	392.00	\N
22	Nước ép dưa hấu	0.60	7.50	0.10	34.00	\N
23	Sữa bò	3.90	4.80	4.40	74.00	\N
24	Sữa chua	3.30	3.60	3.70	61.00	\N
25	Sữa milo	0.90	11.50	0.50	55.00	\N
26	Bánh bèo	1.80	18.10	4.20	118.00	\N
27	Bánh bột lọc	6.80	17.70	4.30	137.00	\N
28	Bánh chưng	4.30	31.60	4.20	181.00	\N
29	Bánh chuối	2.00	40.30	14.20	297.00	\N
30	Bánh cốm	3.40	58.50	0.30	250.00	\N
31	Bánh cuốn	3.00	17.40	5.30	129.00	\N
32	Bánh mì xíu mại	11.30	19.00	7.50	189.00	\N
33	Bánh mì pate	9.80	31.90	11.00	266.00	\N
34	Chè bưởi	0.80	16.60	0.40	73.00	\N
35	Chè chuối	1.30	17.00	0.80	82.00	\N
36	Chè đậu đen	1.20	18.00	0.20	79.00	\N
37	Chè đậu đỏ	1.80	16.50	0.30	77.00	\N
38	Chè đậu xanh	1.30	17.50	0.30	79.00	\N
39	Chè hạt sen	1.20	17.10	0.10	75.00	\N
40	Chè thái	0.50	19.20	0.70	86.00	\N
\.


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 218
-- Name: foods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public.foods_id_seq', 40, true);


--
-- TOC entry 3346 (class 2606 OID 16436)
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- TOC entry 3347 (class 1259 OID 16505)
-- Name: idx_foods_name; Type: INDEX; Schema: public; Owner: appuser
--

CREATE INDEX idx_foods_name ON public.foods USING btree (name);


--
-- TOC entry 3348 (class 1259 OID 16587)
-- Name: idx_foods_name_trgm; Type: INDEX; Schema: public; Owner: appuser
--

CREATE INDEX idx_foods_name_trgm ON public.foods USING gin (name public.gin_trgm_ops);


--
-- TOC entry 3349 (class 2606 OID 16437)
-- Name: foods fk_food_user; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT fk_food_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


-- Completed on 2026-05-20 10:57:57

--
-- PostgreSQL database dump complete
--

\unrestrict iVe2lVFLy1D9amNR85vfCY1qYhJ2J79AKiFs9y0gjW4iSOvKCJ9HnEWSNNcUZEP

