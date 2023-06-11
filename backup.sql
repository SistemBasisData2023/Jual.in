--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.cart (
    transaction_id integer,
    item_id integer,
    quantity integer NOT NULL
);


ALTER TABLE public.cart OWNER TO "bisma.alif";

--
-- Name: category; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.category OWNER TO "bisma.alif";

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: bisma.alif
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO "bisma.alif";

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bisma.alif
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.item (
    item_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price integer NOT NULL,
    category_id integer,
    image_url text DEFAULT 'default_value'::text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.item OWNER TO "bisma.alif";

--
-- Name: item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: bisma.alif
--

CREATE SEQUENCE public.item_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_item_id_seq OWNER TO "bisma.alif";

--
-- Name: item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bisma.alif
--

ALTER SEQUENCE public.item_item_id_seq OWNED BY public.item.item_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer,
    item_id integer,
    rating integer NOT NULL,
    comment text NOT NULL
);


ALTER TABLE public.reviews OWNER TO "bisma.alif";

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: bisma.alif
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO "bisma.alif";

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bisma.alif
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.transaction (
    transaction_id integer NOT NULL,
    user_id integer,
    total_amount integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transaction OWNER TO "bisma.alif";

--
-- Name: transaction_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: bisma.alif
--

CREATE SEQUENCE public.transaction_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_transaction_id_seq OWNER TO "bisma.alif";

--
-- Name: transaction_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bisma.alif
--

ALTER SEQUENCE public.transaction_transaction_id_seq OWNED BY public.transaction.transaction_id;


--
-- Name: useritem; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.useritem (
    user_id integer,
    item_id integer
);


ALTER TABLE public.useritem OWNER TO "bisma.alif";

--
-- Name: users; Type: TABLE; Schema: public; Owner: bisma.alif
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    balance integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.users OWNER TO "bisma.alif";

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: bisma.alif
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO "bisma.alif";

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bisma.alif
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: item item_id; Type: DEFAULT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.item ALTER COLUMN item_id SET DEFAULT nextval('public.item_item_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: transaction transaction_id; Type: DEFAULT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.transaction ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaction_transaction_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.cart (transaction_id, item_id, quantity) FROM stdin;
1	21	1
1	20	1
2	21	1
2	20	1
3	21	1
3	20	1
4	21	1
4	20	1
5	21	1
5	20	1
7	21	1
7	20	1
8	21	1
8	20	1
9	21	1
9	20	1
10	21	1
10	20	1
11	21	1
11	20	1
12	21	1
12	20	1
13	21	1
13	20	1
14	21	1
14	20	1
15	21	1
15	20	1
16	21	1
16	20	1
17	21	1
17	20	1
18	20	1
18	21	1
18	20	1
19	20	1
19	21	1
19	20	1
20	20	1
20	21	1
20	20	1
21	20	1
21	21	1
21	20	1
22	20	1
22	21	1
22	20	1
25	20	1
24	20	1
25	21	1
24	21	1
25	20	1
24	20	1
26	20	1
27	20	1
28	20	1
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.category (category_id, name) FROM stdin;
1	Electronics
2	Households
3	Cars
4	Motorcycles
5	Bikes
6	Hobby and Sports
7	Stationery
8	Gadgets
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.item (item_id, name, description, price, category_id, image_url, quantity) FROM stdin;
1	Samsung S69	Introducing the Samsung S69, a cutting-edge smartphone that redefines the boundaries of innovation and technology. Designed to cater to the most demanding users, the Samsung S69 combines stunning aesthetics with powerful features, delivering an unparalleled user experience.	20000000	1	default_value	1
20	Samsung S55	Second hand item that has a 95% condition.	2500000	1	https://firebasestorage.googleapis.com/v0/b/jual-in-360b4.appspot.com/o/files%2FSamsung%20S55_2023-6-9%2021%3A7%3A44.jpg?alt=media&token=3b7dec46-9e75-47f3-93c0-7664e6ca4d8e	1
21	Xiaomi Redmi Note 7	The Xiaomi Redmi Note 7 is a popular smartphone known for its impressive features and affordability. With its sleek design and powerful performance, this device offers a great user experience. It features a large display, high-resolution camera, and a long-lasting battery life. The Xiaomi Redmi Note 7 is a budget-friendly choice that doesn't compromise on quality, making it a favorable option for those looking for a reliable and feature-packed smartphone.	1500000	8	https://firebasestorage.googleapis.com/v0/b/jual-in-360b4.appspot.com/o/files%2FXiaomi%20Redmi%20Note%207_2023-6-10%2018%3A23%3A49.jpg?alt=media&token=db2711b8-d5e3-4ca6-ad57-9a911c632991	1
31	Pocophone X3	The POCO X3 is a powerful smartphone that offers a great balance of performance and features. It features a Qualcomm Snapdragon 732G processor, which provides smooth performance for multitasking and gaming. The device boasts a large 6.67-inch display with a high refresh rate of 120Hz, ensuring a smooth and responsive user experience. The POCO X3 also excels in the camera department, with a versatile quad-camera setup that captures stunning photos and videos. Additionally, it offers a large battery capacity of 5160mAh, ensuring long-lasting usage. With its competitive pricing and impressive specifications, the POCO X3 is a compelling option for smartphone enthusiasts.	3000000	8	https://firebasestorage.googleapis.com/v0/b/jual-in-360b4.appspot.com/o/files%2FPocophone%20X3_2023-6-10%2019%3A55%3A41.jpeg?alt=media&token=b6ec44ac-b1c2-432f-b309-18e9add98001	2
32	Iphone 	HApe baru brok	20000	8	https://firebasestorage.googleapis.com/v0/b/jual-in-360b4.appspot.com/o/files%2FIphone%20_2023-6-11%2018%3A25%3A18.jpeg?alt=media&token=d844e8bd-7ff3-4fd6-8ee8-844c3b9a9be7	1
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.reviews (review_id, user_id, item_id, rating, comment) FROM stdin;
3	1	1	5	This phone is amazing
4	4	20	5	Great product!
5	4	20	4	Good quality.
6	4	20	3	Average.
7	4	20	2	Below average.
8	4	20	1	Poor product.
9	4	20	5	Highly recommended!
10	4	20	4	Satisfied with the purchase.
11	4	20	3	Could be better.
12	4	20	2	Not impressed.
13	4	20	1	Waste of money.
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.transaction (transaction_id, user_id, total_amount, "timestamp") FROM stdin;
1	8	4000000	2023-06-11 07:37:41.769581
2	8	4000000	2023-06-11 09:06:07.896285
3	8	4000000	2023-06-11 09:06:16.331232
4	8	4000000	2023-06-11 09:21:04.722168
5	8	4000000	2023-06-11 09:21:38.501721
6	8	0	2023-06-11 09:28:55.651133
7	8	4000000	2023-06-11 09:29:45.075634
8	8	4000000	2023-06-11 09:30:05.581185
9	8	4000000	2023-06-11 09:31:53.720324
10	8	4000000	2023-06-11 09:32:33.269726
11	8	4000000	2023-06-11 09:34:00.86493
12	8	4000000	2023-06-11 09:34:45.805666
13	8	4000000	2023-06-11 09:35:49.666233
14	8	4000000	2023-06-11 09:38:40.942558
15	8	4000000	2023-06-11 09:44:10.411889
16	8	4000000	2023-06-11 10:12:28.943455
17	4	4000000	2023-06-11 11:25:49.503468
18	4	6500000	2023-06-11 11:34:16.433973
19	4	6500000	2023-06-11 11:46:27.464097
20	4	6500000	2023-06-11 11:56:39.721109
21	4	6500000	2023-06-11 12:04:06.341483
22	4	6500000	2023-06-11 12:04:55.016174
23	11	0	2023-06-11 12:35:27.768603
24	4	6500000	2023-06-11 13:38:33.639105
25	4	6500000	2023-06-11 13:38:33.638885
26	4	2500000	2023-06-11 15:06:43.168185
27	4	2500000	2023-06-11 16:36:16.655122
28	4	2500000	2023-06-11 16:36:21.984998
\.


--
-- Data for Name: useritem; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.useritem (user_id, item_id) FROM stdin;
4	21
4	31
4	32
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bisma.alif
--

COPY public.users (user_id, username, password_hash, email, role, balance) FROM stdin;
3	admin	$2b$10$UCANtrD7QwlwQvBPhhpoourQYN3VWAu9CwmFEqzr9TaFWThgtmFhu	admin@gmail.com	admin	0
1	biru	$2b$10$8RwlxpNxLOH8KOMb0NtmK.Pd9gs.44dxN91Chr3SL4g9yu449gf0S	biru@gmail.com	user	300000
5	bisma	$2b$10$ROrLmu7ikW4Zl4p3J1ZmWet.NvyD7tirYhhVA0JOWHiSoga0p5wtS	bisma@gmail.com	admin	0
8	dito	$2b$10$rl/qcQ4PKmWSTLlnxp995./GKZe2QuGzIWTokj/QlnFumjMwGUklW	dito@gmail.com	user	0
12	radit	$2b$10$CnJDhsRGZ/8G6RcbAECKmOYgwNsKehuyt5e3m7J1XzLM6EZc60s/O	radit@gmail.com	user	0
4	dio	$2b$10$oiyke0csewxAsmI7CJ1JduRcNKksPHEnYEaN8/SP8pazxWudt4P.i	dio@gmail.com	admin	12200000
11	hanan	$2b$10$UB1H1l0yeI1O.YBqwdJSzebEjVHYr8LLXqMxtb1/s2ZvaJ0beAk5W	hanan@gmail.com	user	1200000
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bisma.alif
--

SELECT pg_catalog.setval('public.category_category_id_seq', 8, true);


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bisma.alif
--

SELECT pg_catalog.setval('public.item_item_id_seq', 32, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bisma.alif
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 13, true);


--
-- Name: transaction_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bisma.alif
--

SELECT pg_catalog.setval('public.transaction_transaction_id_seq', 28, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bisma.alif
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (transaction_id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: cart cart_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(item_id);


--
-- Name: cart cart_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(transaction_id);


--
-- Name: item item_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: reviews reviews_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(item_id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: transaction transaction_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: useritem useritem_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.useritem
    ADD CONSTRAINT useritem_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(item_id) ON DELETE CASCADE;


--
-- Name: useritem useritem_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bisma.alif
--

ALTER TABLE ONLY public.useritem
    ADD CONSTRAINT useritem_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

