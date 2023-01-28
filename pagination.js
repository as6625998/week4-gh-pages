export default  {
    props:['pages','getProducts'], //將page傳進來內層
    template:`<nav aria-label="Page navigation example">
  <ul class="pagination"
  :class="{disabled:!pages.has_pre}">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous"
      @click.prevent ="getProducts(pages.current_page - 1 )">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item" 
    :class="{active:page === pages.current_page}"
    v-for="page in pages.total_pages" :key="page+'pages'">
    <a class="page-link" href="#"
    @click.prevnet="getProducts(page)">{{ page }}</a>
    </li>

    <li class="page-item"
    :class="{disabled:!pages.has_next}">
      <a class="page-link" href="#" aria-label="Next"
      @click.prevent="getProducts(pages.current_page + 1 )">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}