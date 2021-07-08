CREATE DATABASE Portafolio;
USE Portafolio;

CREATE TABLE Hostal (
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    direccion     VARCHAR(100)
);

CREATE TABLE Comedor (
    id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(100),
    hostal_id   INT NOT NULL,
    CONSTRAINT fk_comedor_hostal FOREIGN KEY (hostal_id) REFERENCES Hostal(id)
);

CREATE TABLE Proveedor (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descripcion     VARCHAR(200),
    rubro           VARCHAR(100),
    correo          VARCHAR(100),
    telefono        VARCHAR(100),
    direccion       VARCHAR(100),
    observaciones   VARCHAR(200)
);

CREATE TABLE Contacto_proveedor (
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    apellido      VARCHAR(100),
    telefono      VARCHAR(100),
    correo        VARCHAR(100),
    proveedor_id   INT NOT NULL,
    CONSTRAINT fk_contacto_proveedor FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

CREATE TABLE Empresa (
    id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(100),
    rut         VARCHAR(100),
    direccion   VARCHAR(100),
    correo      VARCHAR(100),
    telefono    VARCHAR(100)
);

CREATE TABLE Rol (
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    descripcion   VARCHAR(100)
);

CREATE TABLE Usuario (
    id                 INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rut                VARCHAR(100),
    nombres            VARCHAR(100),
    apellidos          VARCHAR(100),
    telefono           VARCHAR(100),
    correo             VARCHAR(100),
    fecha_nacimiento   VARCHAR(100),
    password           VARCHAR(100),
    rol_id             INT NOT NULL,
    empresa_id         INT NULL,
    proveedor_id       INT NULL,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES Rol(id),
    CONSTRAINT fk_usuario_empresa FOREIGN KEY (empresa_id) REFERENCES Empresa(id),
    CONSTRAINT fk_usuario_proveedor FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

CREATE TABLE Recepcion_producto (
    id                INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    observaciones     VARCHAR(200) NULL
);

CREATE TABLE Orden_compra (
    id                      INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero                  INT,
    recepcion_id            INT NOT NULL,
    usuario_id              INT NOT NULL,
    CONSTRAINT fk_orden_recepcion FOREIGN KEY (recepcion_id) REFERENCES Recepcion_producto(id)
);

CREATE TABLE Producto (
    id                INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    codigo            VARCHAR(100),
    nombre            VARCHAR(100),
    descripcion       VARCHAR(100),
    valor             INT,
    imagen            BLOB,
    iva               INT,
    orden_compra_id   INT NOT NULL,
    CONSTRAINT fk_producto_orden FOREIGN KEY (orden_compra_id) REFERENCES Orden_compra(id)
);

CREATE TABLE Factura_producto (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    producto_id     INT NOT NULL,
    CONSTRAINT fk_factura FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

CREATE TABLE Habitacion (
    id               INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero           INT NOT NULL,
    descripcion      VARCHAR(200) NOT NULL,
    accesorios       VARCHAR(200),
    observaciones    VARCHAR(200),
    disponibilidad   VARCHAR(100),
    hostal_id        INT NOT NULL,
    CONSTRAINT fk_habitacion_hostal FOREIGN KEY (hostal_id) REFERENCES Hostal(id)
);

CREATE TABLE Informe_estadistica (
    id                       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero                   INT,
    detalle                  VARCHAR(200)
);

CREATE TABLE Minuta (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio    VARCHAR(100) NOT NULL,
    fecha_termino   VARCHAR(100) NOT NULL,
    comedor_id      INT NOT NULL,
    CONSTRAINT fk_minuta_comedor FOREIGN KEY (comedor_id) REFERENCES Comedor(id)
);

CREATE TABLE Factura (
    id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero                 INT,
    total                  INT,
    proveedor_id   INT NOT NULL,
    CONSTRAINT fk_factura_proveedor FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

CREATE TABLE Orden_pedido (
    id                   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero               INT,
    factura_id           INT,
    usuario_id           INT NOT NULL,
    solicitud            VARCHAR(100),
    comentarios          VARCHAR(100),
    estado               VARCHAR(100),
    proveedor_id         INT,
    CONSTRAINT fk_orden_factura FOREIGN KEY (factura_id) REFERENCES Factura(id),
    CONSTRAINT fk_orden_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    CONSTRAINT fk_orden_proveedor FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
);

CREATE TABLE Tipo_plato (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre          VARCHAR(100),
    descripcion     VARCHAR(100)
);

CREATE TABLE Plato (
    id                         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre                     VARCHAR(100),
    precio                     INT,
    descripcion                VARCHAR(100),
    tipo_plato_id              INT NOT NULL,
    minuta_id                  INT NOT NULL,
    CONSTRAINT fk_tipo_plato FOREIGN KEY (tipo_plato_id) REFERENCES Tipo_plato(id),
    CONSTRAINT fk_plato_minuta FOREIGN KEY (minuta_id) REFERENCES Minuta(id) 
);

CREATE TABLE Postre (
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    precio        INT,
    descripcion   VARCHAR(100),
    minuta_id      INT NOT NULL,
    CONSTRAINT fk_postre_minuta FOREIGN KEY (minuta_id) REFERENCES Minuta(id)
);

CREATE TABLE Ensalada (
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(100),
    precio        INT,
    descripcion   VARCHAR(100),
    minuta_id     INT NOT NULL,
    CONSTRAINT fk_ensalada_minuta FOREIGN KEY (minuta_id) REFERENCES Minuta(id)
);

-- INSERT INTO Hostal --
INSERT INTO Hostal (nombre, direccion) VALUES ('Hostal Doña Clarita', 'Av Matta 123341 San Bernardo');

-- INSERT INTO Comedor
INSERT INTO Comedor (nombre, hostal_id) VALUES ('comedor 1', 1);

-- INSERT INTO Proveedor --
INSERT INTO Proveedor (descripcion, rubro, correo, telefono, direccion, observaciones) VALUES ('Pescadería, salmón, pescado, atún, etc', 'Pescadería', 'pescaderia@gmail.com', '+56 9 41112235' , 'Av Portales 23342', 'Pescadería económica.');
INSERT INTO Proveedor (descripcion, rubro, correo, telefono, direccion, observaciones) VALUES ('Panadería, pan, marraquetas, pan amasado, etc.', 'Panadería', 'panadería@gmail.com', '+56 9 85556472' , 'Av Santa María 32123', 'Panadería de calidad.');
INSERT INTO Proveedor (descripcion, rubro, correo, telefono, direccion, observaciones) VALUES ('TodoLimpio SA. Utensilios de aseo.', 'Utensilios de aseo.', 'todoLimpio@gmail.com', '+56 9 95532107' , 'Sta Rosa 99854', 'Buenos utensilios de aseo.');
INSERT INTO Proveedor (descripcion, rubro, correo, telefono, direccion, observaciones) VALUES ('Rarama SA. Alimentos no perecibles.', 'Alimentos no perecibles.', 'rarama@gmail.com', '+56 9 30021598' , 'Av Moreira 885554', 'Alimentos no perecibles de calidad.');

-- INSERT INTO Contacto_proveedor --
INSERT INTO Contacto_proveedor (nombre, apellido, telefono, correo, proveedor_id) VALUES ('Emilio Andrés', 'Fuentes Silva', '+56 9 98827762',  'emilio.fuentes@gmail.com', 1);
INSERT INTO Contacto_proveedor (nombre, apellido, telefono, correo, proveedor_id) VALUES ('Matías José', 'Fuentes Silva', '+56 9 85545552', 'matias.jose@gmail.com', 2);
INSERT INTO Contacto_proveedor (nombre, apellido, telefono, correo, proveedor_id) VALUES ('Francisca Antonia', 'Fuentes Silva', '+56 9 63352548',  'francisca.antonia@gmail.com', 3);
INSERT INTO Contacto_proveedor (nombre, apellido, telefono, correo, proveedor_id) VALUES ('Tania Scarlet', 'Ruiz Barra', '+56 9 78889540',  'tania.scarlet@gmail.com', 4);

-- INSERT INTO Empresa --
INSERT INTO Empresa (nombre, rut, direccion, correo, telefono) VALUES ('Trers60', '76.503.122-3', 'El canto 55667 Huechuraba', 'tres60@gmail.cl', '22 2566354');
INSERT INTO Empresa (nombre, rut, direccion, correo, telefono) VALUES ('Alsacia', '99.321.873-9', 'Sta Rosa 32311 Santiago', 'alsacia@gmail.cl', '22 5544456');
INSERT INTO Empresa (nombre, rut, direccion, correo, telefono) VALUES ('Integram', '11.233.992-7', 'Av Puerto Montt 332144 Vitacura', 'Integram@gmail.cl', '22 5866324');
INSERT INTO Empresa (nombre, rut, direccion, correo, telefono) VALUES ('Hostal Doña Clarita', '22.314.562-8', 'Av Matta 123341 San Bernardo', 'hostalClarita@gmail.cl', '22 8899720');

-- INSERT INTO ROL --
INSERT INTO Rol (nombre, descripcion) VALUES ('Administrador', 'Administrador, tiene todos los privilegios en el sistema.');
INSERT INTO Rol (nombre, descripcion) VALUES ('Cliente', 'Puede ejecutar los módulos de facturació y servicios del sistema.');
INSERT INTO Rol (nombre, descripcion) VALUES ('Empleado', 'Puede generar órdenes de pedido a los proveedores, tiene acceso a productos y proveedores.');
INSERT INTO Rol (nombre, descripcion) VALUES ('Proveedor', 'Puede consultar las órdenes de pedido según su rut, crear contacto proveedor, crear proveedor.');
INSERT INTO Rol (nombre, descripcion) VALUES ('Huesped', 'Cliente ligado a una empresa(cliente).');
INSERT INTO Rol (nombre, descripcion) VALUES ('Invitado', 'Rol por defecto del sistema para los usuarios nuevos.');

-- INSERT INTO Usuario --
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, rol_id, empresa_id, proveedor_id) VALUES ('48.564.336-8', 'Jaime Alexis', 'Nuñez Arriado', '+56 9 77752319', 'jaime@gmail.com', '03-12-1990', 2, 1, null);
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, rol_id, empresa_id, proveedor_id) VALUES ('19.785.320-0', 'Claudio Esteban', 'Martines Soto', '+56 9 89965230', 'claudio@gmail.com', '11-02-1992', 2, 2, null);
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, rol_id, empresa_id, proveedor_id) VALUES ('19.225.658-1', 'Ignacio Rodrigo', 'Cerda Salazar', '+56 9 24965214', 'ignacio@gmail.com', '01-10-1994', 1, 4, null);
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, rol_id, empresa_id, proveedor_id) VALUES ('19.225.658-1', 'Tania Scarlet', 'Ruiz Barra', '+56 9 78889540', 'tania.scarlet@gmail.com', '09-08-1991', 1, 4, 4);
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, rol_id, empresa_id, proveedor_id) VALUES ('85.325.339-1', 'Margarita Alejandra', 'Cisterna Alvarado', '+56 9 89962230', 'margarita.alejandra@gmail.com', '11-11-1992', 5, 2, null);
INSERT INTO Usuario (rut, nombres, apellidos, telefono, correo, fecha_nacimiento, password, rol_id, empresa_id, proveedor_id) VALUES ('18.965.453-8', 'Juan Pablo', 'Muñoz Arias', '+56 9 20013652', 'jp@email.cl', '03-11-1994',  'bnm', 1, 4, null);

-- INSERT INTO Recepcion_producto --
INSERT INTO Recepcion_producto (observaciones) VALUES ('No hay observaciones 1.');
INSERT INTO Recepcion_producto (observaciones) VALUES ('No hay observaciones 2.');
INSERT INTO Recepcion_producto (observaciones) VALUES ('No hay observaciones 3.');
INSERT INTO Recepcion_producto (observaciones) VALUES ('No hay observaciones 4.');

-- INSERT INTO Orden_compra --
INSERT INTO Orden_compra (numero, recepcion_id, usuario_id) VALUES (1, 1, 5);
INSERT INTO Orden_compra (numero, recepcion_id, usuario_id) VALUES (1, 1, 5);
INSERT INTO Orden_compra (numero, recepcion_id, usuario_id) VALUES (1, 1, 5);
INSERT INTO Orden_compra (numero, recepcion_id, usuario_id) VALUES (1, 1, 5);

-- INSERT INTO Producto--
INSERT INTO Producto (codigo, nombre, descripcion, valor, imagen, iva, orden_compra_id) values ('123456789', 'Fideos Lucchetti', 'Paquete de fideos Lucchetti', 5990, null, 400, 1);
INSERT INTO Producto (codigo, nombre, descripcion, valor, imagen, iva, orden_compra_id) values ('123456789', 'Tallarines Lucchetti', 'Paquete de Tallarines Lucchetti', 2990, null, 900, 2);
INSERT INTO Producto (codigo, nombre, descripcion, valor, imagen, iva, orden_compra_id) values ('123456789', 'Corbatitas Lucchetti', 'Paquete de Corbatitas Lucchetti', 4990, null, 300, 3);
INSERT INTO Producto (codigo, nombre, descripcion, valor, imagen, iva, orden_compra_id) values ('123456789', 'Arroz Tucapel', 'Paquete de Arroz Tucapel', 6990, null, 100, 4);

-- INSERT INTO Factura_producto -- 
INSERT INTO Factura_producto (producto_id) values (1);
INSERT INTO Factura_producto (producto_id) values (2);
INSERT INTO Factura_producto (producto_id) values (3);
INSERT INTO Factura_producto (producto_id) values (4);

-- INSERT INTO Habitacion --
INSERT INTO Habitacion (numero, descripcion, accesorios, observaciones, disponibilidad, hostal_id) VALUES (1, 'Habitación para dos personas.', 'Microondas, refrigerados, dos camas 1 plaza, ducha, 1 televisor.', 'Habitación nueva.', 'Disponible', 1);
INSERT INTO Habitacion (numero, descripcion, accesorios, observaciones, disponibilidad, hostal_id) VALUES (2, 'Habitación para tres personas.', 'Microondas, refrigerados, tres camas 1 plaza, ducha, 1 televisor.', 'Habitación nueva.', 'Disponible', 1);
INSERT INTO Habitacion (numero, descripcion, accesorios, observaciones, disponibilidad, hostal_id) VALUES (3, 'Habitación para una persona.', 'Microondas, refrigerados, una cama 1 plaza, ducha, 1 televisor.', 'Habitación nueva.', 'Disponible', 1);
INSERT INTO Habitacion (numero, descripcion, accesorios, observaciones, disponibilidad, hostal_id) VALUES (4, 'Habitación para una personas.', 'Microondas, refrigerados, una cama 1 plaza, ducha, 1 televisor.', 'Habitación nueva.', 'Disponible', 1);

-- INSERT INTO Informe_estadistica --
INSERT INTO Informe_estadistica (numero, detalle) VALUES (1, 'El detalle 1.');
INSERT INTO Informe_estadistica (numero, detalle) VALUES (2, 'El detalle 2.');
INSERT INTO Informe_estadistica (numero, detalle) VALUES (3, 'El detalle 3.');
INSERT INTO Informe_estadistica (numero, detalle) VALUES (4, 'El detalle 4.');

-- INSERT INTO Minuta --
INSERT INTO Minuta (fecha_inicio, fecha_termino, comedor_id) VALUES ('03-12-1990', '03-12-1990', 1);
INSERT INTO Minuta (fecha_inicio, fecha_termino, comedor_id) VALUES ('03-12-1990', '03-12-1990', 1);
INSERT INTO Minuta (fecha_inicio, fecha_termino, comedor_id) VALUES ('03-12-1990', '03-12-1990', 1);
INSERT INTO Minuta (fecha_inicio, fecha_termino, comedor_id) VALUES ('03-12-1990', '03-12-1990', 1);

-- INSERT INTO  Factura --
INSERT INTO Factura (numero, total, proveedor_id) VALUES (1, 19990, 1);
INSERT INTO Factura (numero, total, proveedor_id) VALUES (2, 29990, 2);
INSERT INTO Factura (numero, total, proveedor_id) VALUES (3, 39990, 3);
INSERT INTO Factura (numero, total, proveedor_id) VALUES (4, 49990, 4);

-- INSERT INTO Orden_pedido --

-- INSERT INTO Tipo_plato --
INSERT INTO Tipo_plato (nombre, descripcion) VALUES ('Ejecutivos', 'Platos ejecutivos.');
INSERT INTO Tipo_plato (nombre, descripcion) VALUES ('Especiales', 'Platos especiales.');
INSERT INTO Tipo_plato (nombre, descripcion) VALUES ('Generales', 'Platos generales.');

-- INSERT INTO Plato --
INSERT INTO Plato (nombre, precio, descripcion, tipo_plato_id, minuta_id) VALUES ('Arroz con pollo', 12990, 'Plato de arroz con pollo.', 1, 1);
INSERT INTO Plato (nombre, precio, descripcion, tipo_plato_id, minuta_id) VALUES ('Fideos con pollo', 2990, 'Plato de fideos con pollo.', 2, 2);
INSERT INTO Plato (nombre, precio, descripcion, tipo_plato_id, minuta_id) VALUES ('Puré con pollo', 22990, 'Plato de puré con pollo.', 3, 3);

-- INSERT INTO Postre --
INSERT INTO Postre (nombre, precio, descripcion, minuta_id) VALUES ('Fruta', 1990, 'Plato de frutas.', 1);
INSERT INTO Postre (nombre, precio, descripcion, minuta_id) VALUES ('Flan', 2990, 'Plato de flan.', 2);
INSERT INTO Postre (nombre, precio, descripcion, minuta_id) VALUES ('Helado', 4990, 'Plato de helado.', 3);

-- INSERT INTO Ensalada --
INSERT INTO Ensalada (nombre, precio, descripcion, minuta_id) VALUES ('Lechuga', 690, 'Ensalada de lechuga.', 1);
INSERT INTO Ensalada (nombre, precio, descripcion, minuta_id) VALUES ('Mexicana con pollo', 2990, 'Ensalada Mexicana con pollo.', 2);
INSERT INTO Ensalada (nombre, precio, descripcion, minuta_id) VALUES ('Meditarránea', 4990, 'Ensalada mediterránia.', 3);