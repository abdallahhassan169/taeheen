--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-02-24 13:04:50

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
-- TOC entry 224 (class 1255 OID 57608)
-- Name: haversine_distance(double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.haversine_distance(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
DECLARE
    R DOUBLE PRECISION := 6371000.0; -- Earth radius in meters
    dlat DOUBLE PRECISION := RADIANS(lat2 - lat1);
    dlon DOUBLE PRECISION := RADIANS(lon2 - lon1);
    a DOUBLE PRECISION := SIN(dlat / 2) * SIN(dlat / 2) +
                        COS(RADIANS(lat1)) * COS(RADIANS(lat2)) *
                        SIN(dlon / 2) * SIN(dlon / 2);
    c DOUBLE PRECISION := 2 * ATAN2(SQRT(a), SQRT(1 - a));
    distance DOUBLE PRECISION := R * c;
BEGIN
    RETURN distance/1000;
END;
$$;


ALTER FUNCTION public.haversine_distance(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 57596)
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    id bigint NOT NULL,
    body text NOT NULL,
    is_deleted boolean DEFAULT false,
    date date DEFAULT CURRENT_DATE,
    user_id bigint NOT NULL,
    rate integer
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 57595)
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Comments" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 57629)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 57628)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 57507)
-- Name: complains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complains (
    id bigint NOT NULL,
    name character varying NOT NULL,
    relation character varying,
    age bigint,
    description text,
    clothes_color character varying,
    img character varying,
    user_id bigint,
    passport character varying NOT NULL,
    langitude double precision DEFAULT 1 NOT NULL,
    latitude double precision DEFAULT 1 NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status boolean,
    ip character varying,
    city_id bigint
);


ALTER TABLE public.complains OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 57510)
-- Name: copmlains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.complains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.copmlains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 57498)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_name character varying NOT NULL,
    id bigint NOT NULL,
    password character varying NOT NULL,
    user_type bigint DEFAULT 1 NOT NULL,
    langitude double precision,
    latitude double precision,
    passport text DEFAULT 0 NOT NULL,
    reg_date date DEFAULT CURRENT_DATE,
    is_active boolean DEFAULT true,
    phone text,
    city_id bigint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 57497)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 57578)
-- Name: users_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_types (
    id bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.users_types OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 57577)
-- Name: users_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3214 (class 2606 OID 57603)
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 57635)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id, name);


--
-- TOC entry 3208 (class 2606 OID 57517)
-- Name: complains copmlains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT copmlains_pkey PRIMARY KEY (id, name);


--
-- TOC entry 3218 (class 2606 OID 57637)
-- Name: cities un_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT un_id UNIQUE (id);


--
-- TOC entry 3210 (class 2606 OID 57624)
-- Name: complains un_ip; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT un_ip UNIQUE (ip);


--
-- TOC entry 3204 (class 2606 OID 57506)
-- Name: users un_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT un_name UNIQUE (user_name);


--
-- TOC entry 3206 (class 2606 OID 57504)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3212 (class 2606 OID 57584)
-- Name: users_types users_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_types
    ADD CONSTRAINT users_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 57638)
-- Name: users fk_city; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3221 (class 2606 OID 57643)
-- Name: complains fk_city; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3222 (class 2606 OID 57518)
-- Name: complains fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3223 (class 2606 OID 57609)
-- Name: Comments fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3220 (class 2606 OID 57585)
-- Name: users fk_user_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type) REFERENCES public.users_types(id) NOT VALID;


-- Completed on 2024-02-24 13:04:50

--
-- PostgreSQL database dump complete
--

