PGDMP                         |         	   complains    15.3    15.3                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            #           1262    57496 	   complains    DATABASE     �   CREATE DATABASE complains WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1256';
    DROP DATABASE complains;
                postgres    false            �            1255    57608 Z   haversine_distance(double precision, double precision, double precision, double precision)    FUNCTION     �  CREATE FUNCTION public.haversine_distance(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision) RETURNS double precision
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
 �   DROP FUNCTION public.haversine_distance(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision);
       public          postgres    false            �            1259    57596    Comments    TABLE     �   CREATE TABLE public."Comments" (
    id bigint NOT NULL,
    body text NOT NULL,
    is_deleted boolean DEFAULT false,
    date date DEFAULT CURRENT_DATE,
    user_id bigint NOT NULL
);
    DROP TABLE public."Comments";
       public         heap    postgres    false            �            1259    57595    Comments_id_seq    SEQUENCE     �   ALTER TABLE public."Comments" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    57507 	   complains    TABLE     �  CREATE TABLE public.complains (
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
    status boolean
);
    DROP TABLE public.complains;
       public         heap    postgres    false            �            1259    57510    copmlains_id_seq    SEQUENCE     �   ALTER TABLE public.complains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.copmlains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    57498    users    TABLE     �   CREATE TABLE public.users (
    user_name character varying NOT NULL,
    id bigint NOT NULL,
    password character varying NOT NULL,
    user_type bigint DEFAULT 1 NOT NULL,
    langitude double precision,
    latitude double precision
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    57497    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    57578    users_types    TABLE     a   CREATE TABLE public.users_types (
    id bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.users_types;
       public         heap    postgres    false            �            1259    57577    users_types_id_seq    SEQUENCE     �   ALTER TABLE public.users_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219                      0    57596    Comments 
   TABLE DATA           I   COPY public."Comments" (id, body, is_deleted, date, user_id) FROM stdin;
    public          postgres    false    221   E$                 0    57507 	   complains 
   TABLE DATA           �   COPY public.complains (id, name, relation, age, description, clothes_color, img, user_id, passport, langitude, latitude, date, status) FROM stdin;
    public          postgres    false    216   b$                 0    57498    users 
   TABLE DATA           X   COPY public.users (user_name, id, password, user_type, langitude, latitude) FROM stdin;
    public          postgres    false    215   �$                 0    57578    users_types 
   TABLE DATA           /   COPY public.users_types (id, name) FROM stdin;
    public          postgres    false    219   J%       $           0    0    Comments_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Comments_id_seq"', 1, false);
          public          postgres    false    220            %           0    0    copmlains_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.copmlains_id_seq', 6, true);
          public          postgres    false    217            &           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    214            '           0    0    users_types_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_types_id_seq', 3, true);
          public          postgres    false    218            �           2606    57603    Comments Comments_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Comments" DROP CONSTRAINT "Comments_pkey";
       public            postgres    false    221            �           2606    57517    complains copmlains_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.complains
    ADD CONSTRAINT copmlains_pkey PRIMARY KEY (id, name);
 B   ALTER TABLE ONLY public.complains DROP CONSTRAINT copmlains_pkey;
       public            postgres    false    216    216            |           2606    57506    users un_name 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT un_name UNIQUE (user_name);
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT un_name;
       public            postgres    false    215            ~           2606    57504    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    57584    users_types users_types_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users_types
    ADD CONSTRAINT users_types_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.users_types DROP CONSTRAINT users_types_pkey;
       public            postgres    false    219            �           2606    57518    complains fk_user    FK CONSTRAINT     z   ALTER TABLE ONLY public.complains
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.complains DROP CONSTRAINT fk_user;
       public          postgres    false    3198    215    216            �           2606    57609    Comments fk_user    FK CONSTRAINT     {   ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 <   ALTER TABLE ONLY public."Comments" DROP CONSTRAINT fk_user;
       public          postgres    false    221    215    3198            �           2606    57585    users fk_user_type    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type) REFERENCES public.users_types(id) NOT VALID;
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT fk_user_type;
       public          postgres    false    219    215    3202                  x������ � �         �   x�M��
�0Dϛ��.Mfg�M�G���UA(��c#=8����3��]�K���l-%e�ث͠���$-(�V�k|n�**J�A�Ff+b9�I!�pP�����0�m�"�}/�!6��{��D�ڠ�����b���&�         A   x�˭�/-N-�4�442615�4��"���ĜL $��542�31�4�46�377������ �vk         "   x�3�,-N-�2�LL����2�L�-������ `��     