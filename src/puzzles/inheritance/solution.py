Base = type("", (type,), {"__subclasscheck__": lambda _, s: s.__name__ == "NotDerived"})("", (), {})
