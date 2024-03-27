--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.3

-- Started on 2024-03-28 00:44:27

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: abdallah
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO abdallah;

--
-- TOC entry 224 (class 1255 OID 16398)
-- Name: haversine_distance(double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: abdallah
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


ALTER FUNCTION public.haversine_distance(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision) OWNER TO abdallah;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: Comments; Type: TABLE; Schema: public; Owner: abdallah
--

CREATE TABLE public."Comments" (
    id bigint NOT NULL,
    body text NOT NULL,
    is_deleted boolean DEFAULT false,
    date date DEFAULT CURRENT_DATE,
    user_id bigint NOT NULL,
    rate integer,
    is_approved boolean DEFAULT false
);


ALTER TABLE public."Comments" OWNER TO abdallah;

--
-- TOC entry 215 (class 1259 OID 16406)
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: abdallah
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
-- TOC entry 216 (class 1259 OID 16407)
-- Name: cities; Type: TABLE; Schema: public; Owner: abdallah
--

CREATE TABLE public.cities (
    id bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.cities OWNER TO abdallah;

--
-- TOC entry 217 (class 1259 OID 16412)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: abdallah
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
-- TOC entry 218 (class 1259 OID 16413)
-- Name: complains; Type: TABLE; Schema: public; Owner: abdallah
--

CREATE TABLE public.complains (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    relation character varying(20),
    description text,
    clothes_color character varying(50),
    img character varying(100),
    user_id bigint,
    passport character varying NOT NULL,
    langitude double precision DEFAULT 1,
    latitude double precision DEFAULT 1,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status boolean,
    ip character varying(25),
    city_id bigint,
    nationality character varying(25),
    "time" character varying(15),
    "position" character varying(15),
    emp_note character varying(500),
    age character varying(50) DEFAULT 5
);


ALTER TABLE public.complains OWNER TO abdallah;

--
-- TOC entry 219 (class 1259 OID 16421)
-- Name: copmlains_id_seq; Type: SEQUENCE; Schema: public; Owner: abdallah
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
-- TOC entry 220 (class 1259 OID 16422)
-- Name: users; Type: TABLE; Schema: public; Owner: abdallah
--

CREATE TABLE public.users (
    user_name character varying(25) NOT NULL,
    id bigint NOT NULL,
    password character varying(25),
    user_type bigint DEFAULT 1 NOT NULL,
    langitude double precision,
    latitude double precision,
    passport text DEFAULT 0 NOT NULL,
    reg_date date DEFAULT CURRENT_DATE,
    is_active boolean DEFAULT true,
    phone text,
    city_id bigint,
    last_name character varying,
    phone_verified boolean DEFAULT false,
    code character varying,
    code_time timestamp with time zone
);


ALTER TABLE public.users OWNER TO abdallah;

--
-- TOC entry 221 (class 1259 OID 16431)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: abdallah
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
-- TOC entry 222 (class 1259 OID 16432)
-- Name: users_types; Type: TABLE; Schema: public; Owner: abdallah
--

CREATE TABLE public.users_types (
    id bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.users_types OWNER TO abdallah;

--
-- TOC entry 223 (class 1259 OID 16437)
-- Name: users_types_id_seq; Type: SEQUENCE; Schema: public; Owner: abdallah
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
-- TOC entry 3026 (class 2606 OID 16439)
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- TOC entry 3028 (class 2606 OID 16441)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id, name);


--
-- TOC entry 3032 (class 2606 OID 16492)
-- Name: complains copmlains_pkey; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT copmlains_pkey PRIMARY KEY (id, name);


--
-- TOC entry 3030 (class 2606 OID 16445)
-- Name: cities un_id; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT un_id UNIQUE (id);


--
-- TOC entry 3034 (class 2606 OID 16522)
-- Name: complains un_ip; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT un_ip UNIQUE (ip);


--
-- TOC entry 3036 (class 2606 OID 16449)
-- Name: users un_phone; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT un_phone UNIQUE (phone);


--
-- TOC entry 3038 (class 2606 OID 16451)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3040 (class 2606 OID 16453)
-- Name: users_types users_types_pkey; Type: CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.users_types
    ADD CONSTRAINT users_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3044 (class 2606 OID 16454)
-- Name: users fk_city; Type: FK CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3042 (class 2606 OID 16459)
-- Name: complains fk_city; Type: FK CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3043 (class 2606 OID 16464)
-- Name: complains fk_user; Type: FK CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.complains
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3041 (class 2606 OID 16469)
-- Name: Comments fk_user; Type: FK CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3045 (class 2606 OID 16474)
-- Name: users fk_user_type; Type: FK CONSTRAINT; Schema: public; Owner: abdallah
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type) REFERENCES public.users_types(id) NOT VALID;


--
-- TOC entry 2057 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO abdallah;


--
-- TOC entry 2059 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO abdallah;


--
-- TOC entry 2058 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO abdallah;


--
-- TOC entry 2056 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO abdallah;


-- Completed on 2024-03-28 00:44:45

--
-- PostgreSQL database dump complete
--

