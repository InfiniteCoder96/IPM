<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{asset('dist/img/avatar5.png')}}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p> {{ Auth::user()->name }}</p>
                <!-- Status -->
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- search form (Optional) -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search...">
                <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
            </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">
                <marquee behavior="scroll" direction="left"  >
                    WELCOME TO INSURANCE POLICY MANAGER
                </marquee>
            </li>
            <!-- Optionally, you can add icons to the links -->
            <li class="active"><a href="{{url('/admin')}}"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>
            <li class="header">Primary Data</li>
            <li class="treeview">
                <a href="#"><i class="fa fa-money"></i> <span>Policies</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{url('sales/create')}}"><i class="fa fa-circle-o"></i> Add New Policy</a></li>
                    <li><a href="{{url('sales')}}"><i class="fa fa-circle-o"></i> Policy List</a></li>

                </ul>
            </li>
            <li class="treeview">
                <a href="#"><i class="fa fa-cubes"></i> <span>Add-Ons</span>
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{url('sales/create')}}"><i class="fa fa-circle-o"></i> Add New Feature</a></li>
                    <li><a href="{{url('sales')}}"><i class="fa fa-circle-o"></i> Feature List</a></li>

                </ul>

            </li>
            <li class="treeview">
                <a href="#"><i class="fa fa-cubes"></i> <span>Companies</span>
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{url('companies/create')}}"><i class="fa fa-circle-o"></i> Add New Company</a></li>
                    <li><a href="{{url('companies')}}"><i class="fa fa-circle-o"></i> Company List</a></li>

                </ul>

            </li>


            <li class="header">Reports</li>
            <li class="treeview">
                <a href="#"><i class="fa fa-file-text"></i> <span>Reports</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>

            </li>
        </ul>
        <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>
