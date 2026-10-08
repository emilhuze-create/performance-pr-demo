# Performance PR Demo

This project demonstrates a practical performance optimization in a small utility that filters duplicate and excluded users.

## 10 performance improvements to consider
1. Replace repeated linear membership scans with `Set` lookups.
2. Precompute normalized keys instead of re-normalizing values inside nested loops.
3. Batch DOM writes instead of mutating the tree per item.
4. Memoize repeated calculations for static inputs.
5. Avoid recreating large arrays or objects inside hot loops.
6. Defer non-critical work to idle time.
7. Use streaming or chunked processing for large collections.
8. Cache expensive JSON parsing or serialization.
9. Limit rerenders by splitting static and dynamic UI sections.
10. Reduce network calls by combining requests or using HTTP caching.

## Selected PR improvement
The highest-impact, lowest-effort improvement here is using a `Set` for exclusion lookups and duplicate detection. That reduces repeated O(n * m) scans to O(n + m) work.
