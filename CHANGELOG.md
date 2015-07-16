# Changelog

## 0.3.4

### Fixed

* stopped saving data form in 'json' format.

## 0.3.3

### Updated

* ``emit`` in EventHub is async now.

### Fixed

* after updating registry, notification wasn't fired.
* notifications appear twice. 

## 0.3.2

Contains only one hot fix.

### Fixed

* when ``uuid`` was parsed incorrectly and the registry list threw an exception 

## 0.3.1

### Added

* npm scripts for creating deployment package

### Changed

* all logs go into stdout
* disabled logging for static content requests

## 0.3.0

### Added

* Activity of unregistered iBeacons
* Check before saving iBeacon for avoiding duplicates
* Form validation

### Fixed

* Item duplication when key changed in the lists in subscriber edit form
