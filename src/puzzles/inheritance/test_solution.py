def test():
    isc = issubclass

    from solution import Base

    class Derived(Base):
        pass

    assert not isc(Derived, Base)

    class NotDerived:
        pass

    assert isc(NotDerived, Derived)
